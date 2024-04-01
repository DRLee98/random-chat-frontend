import {useEffect, useState} from 'react';
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

import {Button, Text, TextInput, View} from 'react-native';
import CustomScrollView from '@app/components/common/CustomScrollView';
import Message from '@app/components/chat/message';
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

import type {StackScreenProps} from '@react-navigation/stack';
import type {MainNavigatorParamList} from '@app/navigators';
import type {Messages} from '@app/graphql/__generated__/graphql';
import type {FragmentType} from '@app/graphql/__generated__';

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

  return (
    <Container>
      <CustomScrollView>
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
        <View>
          {messages?.map(m => (
            <Message
              key={`message-${m.id}`}
              unReadCount={formatReadCount(m.readUsersId)}
              {...m}
            />
          ))}
        </View>
        {/* {message?.viewMessages.hasNext && (
        <Button title="더 불러오기" onPress={fetchMore} />
      )} */}
        {/* <ExitButton
        roomId={roomId}
        type="icon"
        onAfterDelete={deleteRoomAfterFn}
      /> */}
      </CustomScrollView>
      <Input
        value={value}
        onChange={e => setValue(e.nativeEvent.text)}
        right={
          <SendButton>
            <SendIcon name="send" size={16} />
          </SendButton>
        }
      />
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
  padding: 15px;
  background-color: ${({theme}) => theme.bgColor};
`;

const SendButton = styled.TouchableOpacity`
  padding: 10px;
  background-color: ${({theme}) => theme.blue.default};
  border-radius: 999px;
`;

const SendIcon = styled(Icon)`
  color: ${({theme}) => theme.bgColor};
`;

export default ChatRoomScreen;
