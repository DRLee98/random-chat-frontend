import {useEffect, useMemo, useState} from 'react';
import {useUpdateMyRooms} from '@app/graphql/hooks/room/useMyRooms';
import useRoomDetail from '@app/graphql/hooks/room/useRoomDetail';
import useViewMessages, {
  useUpdateViewMessages,
} from '@app/graphql/hooks/message/useViewMessages';
import useNewMessageListener from '@app/graphql/hooks/message/useNewMessageListener';
import useReadMessageListener from '@app/graphql/hooks/message/useReadMessageListener';
import useSendMessage from '@app/graphql/hooks/message/useSendMessage';
import useMe from '@app/graphql/hooks/user/useMe';
import {useModal} from '@app/contexts/modalContext';

import styled from 'styled-components/native';

import Message from '@app/components/chat/Message';
import Input from '@app/components/common/input/BorderInput';
import ChatRoomTopModal from '@app/components/room/ChatRoomTopModal';
import Loader from '@app/components/common/Loader';
import Icon from 'react-native-vector-icons/FontAwesome';

import {MainNavigatorScreens} from '@app/navigators';
import {MessageType} from '@app/graphql/__generated__/graphql';

import {MESSAGE_BASE} from '@app/graphql/fragments/message';
import {getFragmentData} from '@app/graphql/__generated__';

import {dateStringToNumber, getSystemDateStr, isToday} from '@app/utils/date';
import {getChatRoomName} from '@app/utils/name';

import type {StackScreenProps} from '@react-navigation/stack';
import type {MainNavigatorParamList} from '@app/navigators';
import type {FlatListProps} from 'react-native';
import type {MessageBaseFragment} from '@app/graphql/__generated__/graphql';
import type {FragmentType} from '@app/graphql/__generated__';

export interface BundledMessage
  extends Pick<MessageBaseFragment, 'id' | 'user' | 'createdAt'> {
  contents: Array<
    Pick<MessageBaseFragment, 'type' | 'contents'> & {
      unReadCount: number;
    }
  >;
  systemMessage: boolean;
}

export interface ChatRoomScreenParams {
  roomId: string;
  chatRoomName: string | null;
  newMessageCount: number;
}

interface ChatRoomScreenProps
  extends StackScreenProps<
    MainNavigatorParamList,
    MainNavigatorScreens.ChatRoom
  > {}

const ChatRoomScreen = ({route}: ChatRoomScreenProps) => {
  const {roomId, chatRoomName, newMessageCount} = route.params;

  const showModal = useModal();

  const [value, setValue] = useState('');

  const [sendMessage, {loading}] = useSendMessage();

  const {updateMyRoom, sortMyRooms} = useUpdateMyRooms();
  const {updateMessages, appendMessage, appendSystemMessage} =
    useUpdateViewMessages({
      roomId,
    });

  const {me} = useMe();
  const {data: room} = useRoomDetail({roomId});
  const {messages, fetchMore, refetch, networkStatus} = useViewMessages({
    roomId,
  });

  const appendMessageFn = (newMessage?: FragmentType<typeof MESSAGE_BASE>) => {
    if (!room?.roomDetail.room || !newMessage) return;

    const lastMessage = messages[messages.length - 1];
    if (!lastMessage || !isToday(lastMessage.createdAt)) {
      const systemMessage = getSystemDateStr();
      appendSystemMessage(systemMessage);
    }

    appendMessage(newMessage);
    const messageData = getFragmentData(MESSAGE_BASE, newMessage);
    updateMyRoom(
      room.roomDetail.room.userRoom.id,
      {lastMessage: messageData.contents},
      {updatedAt: new Date()},
    );
    sortMyRooms();
  };

  const updateReadMessages = (
    messages?: Pick<MessageBaseFragment, 'id' | '__typename' | 'readUsersId'>[],
  ) => {
    if (!messages || messages.length === 0) return;
    updateMessages(messages);
  };

  const sendMessageFn = async () => {
    if (!me || !value) return;
    if (loading) return;
    const {data} = await sendMessage({
      variables: {
        input: {
          roomId: route.params.roomId,
          contents: value,
          type: MessageType.Text,
        },
      },
    });
    if (data?.sendMessage.message) {
      appendMessageFn(data.sendMessage.message);
      setValue('');
    }
    if (data?.sendMessage.error) {
      showModal({
        title: '메시지 전송에 실패했어요',
        message: data.sendMessage.error,
        buttons: [{text: '확인'}],
      });
    }
  };

  const formatReadCount = (readUsersId: string[]) => {
    const roomUserIds =
      room?.roomDetail.room?.users?.map(user => user.id) ?? [];
    return (
      roomUserIds.length -
      roomUserIds.filter(id => [...readUsersId, me?.id].includes(id)).length
    );
  };

  useNewMessageListener({
    variables: {input: {roomId}},
    onData: ({data}) => appendMessageFn(data.data?.newMessage),
  });
  useReadMessageListener({
    variables: {input: {roomId}},
    onData: ({data}) => updateReadMessages(data.data?.readMessage.messages),
  });

  useEffect(() => {
    if (messages && room?.roomDetail.room && newMessageCount > 0) {
      updateMyRoom(room.roomDetail.room.userRoom.id, {newMessage: 0});
    }
  }, [messages, room?.roomDetail.room]);

  useEffect(() => {
    if (networkStatus !== 1 && newMessageCount > 0) {
      refetch();
    }
  }, []);

  const bundledMessages = useMemo(() => {
    const bundled: BundledMessage[] = [];

    messages.forEach((m, i, list) => {
      const contents = {
        contents: m.contents,
        type: m.type,
        unReadCount: formatReadCount(m.readUsersId),
      };

      if (
        i > 0 &&
        list[i - 1].user.id === m.user.id &&
        contents.type !== MessageType.System &&
        list[i - 1].type !== MessageType.System
      ) {
        const prevCreatedTime = dateStringToNumber(list[i - 1].createdAt);
        const createdTime = dateStringToNumber(m.createdAt);
        if (createdTime - prevCreatedTime < 60000) {
          bundled[bundled.length - 1].contents.push(contents);
          return;
        }
      }

      bundled.push({
        id: m.id,
        user: m.user,
        createdAt: m.createdAt,
        contents: [contents],
        systemMessage: m.type === MessageType.System,
      });
    });

    return bundled;
  }, [messages]);

  return (
    <Container>
      <BackgroundTextBox>
        <BackgroundText>
          {`부적절하거나 불쾌감을 줄 수 있는\n내용을 작성할 경우 제재를 받을 수 있습니다.\n\n건전한 이용 부탁드립나다. 😊`}
        </BackgroundText>
      </BackgroundTextBox>
      <MessageBox
        inverted
        data={[...bundledMessages].reverse()}
        renderItem={({item}) => (
          <Message myMessage={item.user.id === me?.id} {...item} />
        )}
        keyExtractor={item => item.id}
        ListHeaderComponent={<HeightBox />}
        ListFooterComponent={<HeightBox />}
        onEndReached={fetchMore}
        onEndReachedThreshold={0.5}
        refreshing={networkStatus === 4}
        onRefresh={refetch}
      />
      <InputBox>
        <Input
          value={value}
          onChange={e => setValue(e.nativeEvent.text)}
          returnKeyType="send"
          placeholder="메시지를 입력해주세요."
          right={
            <SendButton disabled={loading}>
              {loading ? (
                <Loader size={16} />
              ) : (
                <SendIcon name="send" size={16} onPress={sendMessageFn} />
              )}
            </SendButton>
          }
        />
      </InputBox>
      <ChatRoomTopModal
        chatRoomName={chatRoomName ?? getChatRoomName(room?.roomDetail.room)}
        roomId={roomId}
        roomDetail={room?.roomDetail.room}
        me={me}
      />
    </Container>
  );
};

const Container = styled.SafeAreaView`
  flex: 1;
  background-color: ${({theme}) => theme.bgColor};
`;

const BackgroundTextBox = styled.View`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 150px;

  align-items: center;
  justify-content: center;
`;

const BackgroundText = styled.Text`
  font-size: 16px;
  font-weight: 900;
  color: ${({theme}) => theme.gray400.default};
  text-align: center;
`;

const MessageBox = styled.FlatList<FlatListProps<BundledMessage>>`
  padding: 0px 12px;
`;

const HeightBox = styled.View`
  height: 15px;
`;

const InputBox = styled.View`
  padding: 5px 12px;
  padding-top: 10px;
  border-top-width: 1px;
  border-style: solid;
  border-color: ${({theme}) => theme.gray300.default};
`;

const SendButton = styled.TouchableOpacity`
  padding: 10px;
  background-color: ${({theme}) => theme.primary.default};
  border-radius: 999px;
`;

const SendIcon = styled(Icon)`
  color: ${({theme}) => theme.bgColor};
`;

export default ChatRoomScreen;
