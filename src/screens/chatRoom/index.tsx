import {useEffect, useLayoutEffect, useMemo, useState} from 'react';
import {useUpdateMyRooms} from '@app/graphql/hooks/room/useMyRooms';
import useRoomDetail from '@app/graphql/hooks/room/useRoomDetail';
import useViewMessages, {
  useUpdateViewMessages,
} from '@app/graphql/hooks/message/useViewMessages';
import useNewMessageListener from '@app/graphql/hooks/message/useNewMessageListener';
import useReadMessageListener from '@app/graphql/hooks/message/useReadMessageListener';
import useSendMessage from '@app/graphql/hooks/message/useSendMessage';
import useMe from '@app/graphql/hooks/user/useMe';

import styled from 'styled-components/native';

import {Platform} from 'react-native';
import Message from '@app/components/chat/Message';
import Input from '@app/components/common/Input';
import ToggleUserBlockButton from '@app/components/user/ToggleUserBlockButton';
import NotiButton from '@app/components/room/NotiButton';
import PinnedButton from '@app/components/room/PinnedButton';
import ExitButton from '@app/components/room/ExitButton';
import Icon from 'react-native-vector-icons/FontAwesome';

import {MainNavigatorScreens} from '@app/navigators';
import {MessageType} from '@app/graphql/__generated__/graphql';

import {MESSAGE_BASE} from '@app/graphql/fragments/message';
import {getFragmentData} from '@app/graphql/__generated__';

import {dateStringToNumber, getStatusBarHeight} from '@app/utils/functions';

import type {StackScreenProps} from '@react-navigation/stack';
import type {MainNavigatorParamList} from '@app/navigators';
import type {FlatListProps} from 'react-native';
import type {
  MessageBaseFragment,
  Messages,
} from '@app/graphql/__generated__/graphql';
import type {FragmentType} from '@app/graphql/__generated__';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

export interface BundledMessage
  extends Pick<MessageBaseFragment, 'id' | 'user' | 'createdAt'> {
  contents: Array<
    Pick<MessageBaseFragment, 'type' | 'contents'> & {
      unReadCount: number;
    }
  >;
}

export interface ChatRoomScreenParams {
  roomId: string;
}

interface ChatRoomScreenProps
  extends StackScreenProps<
    MainNavigatorParamList,
    MainNavigatorScreens.ChatRoom
  > {}

const ChatRoomScreen = ({route, navigation}: ChatRoomScreenProps) => {
  const roomId = route.params.roomId;
  const statusBarHeight = getStatusBarHeight();
  const insets = useSafeAreaInsets();

  const [value, setValue] = useState('');

  const [sendMessage] = useSendMessage();

  const {updateMyRoom, sortMyRooms} = useUpdateMyRooms();
  const {updateMessages, appendMessage} = useUpdateViewMessages({
    roomId,
  });

  const {me} = useMe();
  const {data: room} = useRoomDetail({roomId});
  const {messages, fetchMore} = useViewMessages({
    roomId,
  });

  const appendMessageFn = (newMessage?: FragmentType<typeof MESSAGE_BASE>) => {
    if (!room?.roomDetail.room || !newMessage) return;
    appendMessage(newMessage);
    const messageData = getFragmentData(MESSAGE_BASE, newMessage);
    updateMyRoom(
      room.roomDetail.room.userRoom.id,
      {lastMessage: messageData.contents},
      {updatedAt: new Date()},
    );
    sortMyRooms();
  };

  const updateReadMessages = (messages?: Messages[]) => {
    if (!messages || messages.length === 0) return;
    updateMessages(messages);
  };

  const sendMessageFn = async () => {
    if (!me || !value) return;
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
    }
    setValue('');
  };

  const formatReadCount = (readUsersId: string[]) => {
    const roomUserIds =
      room?.roomDetail.room?.users?.map(user => user.id) ?? [];
    return (
      roomUserIds.length -
      roomUserIds.filter(id => [...readUsersId, me?.id].includes(id)).length
    );
  };

  const deleteRoomAfterFn = async () => {
    navigation.reset({routes: [{name: MainNavigatorScreens.Home}]});
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
    if (messages && room?.roomDetail.room) {
      updateMyRoom(room.roomDetail.room.userRoom.id, {newMessage: 0});
    }
  }, [messages, room?.roomDetail.room]);

  const bundledMessages = useMemo(() => {
    const bundled: BundledMessage[] = [];

    messages.forEach((m, i, list) => {
      const contents = {
        contents: m.contents,
        type: m.type,
        unReadCount: formatReadCount(m.readUsersId),
      };

      if (i > 0) {
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
      });
    });

    return bundled;
  }, [messages]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: room?.roomDetail.room?.userRoom.name,
    });
  }, [navigation, room]);

  return (
    <Container
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={statusBarHeight + insets.top - insets.bottom}>
      {/* <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text>
              Chat Room: {room?.roomDetail.room?.userRoom.name}, id:{' '}
              {route.params.roomId}
            </Text>
            {room?.roomDetail.room && (
              <View style={{flexDirection: 'row', gap: 10}}>
                <NotiButton
                  roomId={route.params.roomId}
                  userRoomId={room.roomDetail.room.userRoom.id}
                  noti={room.roomDetail.room.userRoom.noti}
                />
                <PinnedButton
                  roomId={route.params.roomId}
                  userRoomId={room.roomDetail.room.userRoom.id}
                  pinned={Boolean(room.roomDetail.room.userRoom.pinnedAt)}
                />
              </View>
            )}
          </View>
          <View style={{marginVertical: 20}}>
            {room?.roomDetail.room?.users?.map(user => (
              <View
                key={user.id}
                style={{flexDirection: 'row', alignItems: 'center'}}>
                <Text>
                  id: {user.id}, nick: {user.nickname}
                </Text>
                {me && user.id !== me.id && (
                  <ToggleUserBlockButton
                    me={me}
                    userId={user.id}
                    nickname={user.nickname}
                  />
                )}
              </View>
            ))}
          </View> */}
      {/* <ExitButton
          roomId={roomId}
          type="icon"
          onAfterDelete={deleteRoomAfterFn}
        /> */}
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
      />
      <InputBox style={{paddingBottom: insets.bottom + 5}}>
        <Input
          value={value}
          onChange={e => setValue(e.nativeEvent.text)}
          returnKeyType="send"
          right={
            <SendButton>
              <SendIcon name="send" size={16} onPress={sendMessageFn} />
            </SendButton>
          }
        />
      </InputBox>
    </Container>
  );
};

const Container = styled.KeyboardAvoidingView`
  flex: 1;
  background-color: ${({theme}) => theme.bgColor};
`;

const MessageBox = styled.FlatList<FlatListProps<BundledMessage>>`
  padding: 0px 12px;
`;

const HeightBox = styled.View`
  height: 15px;
`;

const InputBox = styled.View`
  padding: 5px 12px;
  border-top-width: 1px;
  border-style: solid;
  border-color: ${({theme}) => theme.gray300.default};
`;

const SendButton = styled.TouchableOpacity`
  padding: 10px;
  background-color: ${({theme}) => theme.orange.default};
  border-radius: 999px;
`;

const SendIcon = styled(Icon)`
  color: ${({theme}) => theme.bgColor};
`;

export default ChatRoomScreen;
