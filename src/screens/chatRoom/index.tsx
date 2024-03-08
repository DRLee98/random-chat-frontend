import {useState} from 'react';
import {useUpdateMyRooms} from '@app/graphql/hooks/room/useMyRooms';
import useRoomDetail from '@app/graphql/hooks/room/useRoomDetail';
import useDeleteRoom from '@app/graphql/hooks/room/useDeleteRoom';
import useViewMessages, {
  useUpdateViewMessages,
} from '@app/graphql/hooks/message/useViewMessages';
import useNewMessageListener from '@app/graphql/hooks/message/useNewMessageListener';
import useReadMessageListener from '@app/graphql/hooks/message/useReadMessageListener';
import useSendMessage from '@app/graphql/hooks/message/useSendMessage';
import useMe from '@app/graphql/hooks/user/useMe';

import {Button, ScrollView, Text, TextInput, View} from 'react-native';
import ToggleUserBlockButton from '@app/components/user/ToggleUserBlockButton';

import {MainNavigatorScreens} from '@app/navigators';
import {MessageType} from '@app/graphql/types/graphql';

import type {StackScreenProps} from '@react-navigation/stack';
import type {MainNavigatorParamList} from '@app/navigators';
import type {MessageBaseFragment, Messages} from '@app/graphql/types/graphql';
import NotiButton from '@app/components/room/NotiButton';
import PinnedButton from '@app/components/room/PinnedButton';

export interface ChatRoomScreenParams {
  roomId: string;
}

interface ChatRoomScreenProps
  extends StackScreenProps<
    MainNavigatorParamList,
    MainNavigatorScreens.ChatRoom
  > {}

const ChatRoomScreen = ({route, navigation}: ChatRoomScreenProps) => {
  const [value, setValue] = useState('');

  const [sendMessage] = useSendMessage();
  const [deleteRoom] = useDeleteRoom();

  const {updateMyRoom, removeMyRoom, sortMyRooms} = useUpdateMyRooms();
  const {updateMessages, appendMessage} = useUpdateViewMessages({
    roomId: +route.params.roomId,
  });

  const {me} = useMe();
  const {data: room} = useRoomDetail({roomId: +route.params.roomId});
  const {data: message, fetchMore} = useViewMessages({
    roomId: +route.params.roomId,
  });

  const appendMessageFn = (newMessage: MessageBaseFragment) => {
    if (!room?.roomDetail.room) return;
    appendMessage(newMessage);
    updateMyRoom(
      room.roomDetail.room.userRoom.id,
      {lastMessage: newMessage.contents},
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
          roomId: +route.params.roomId,
          contents: value,
          type: MessageType.Text,
        },
      },
    });
    if (data?.sendMessage.messageId) {
      appendMessageFn({
        __typename: 'MessageObjectType',
        id: data.sendMessage.messageId + '',
        contents: value,
        type: MessageType.Text,
        readUsersId: [+me.id],
        user: {
          __typename: 'UserObjectType',
          id: me.id,
          nickname: me.nickname,
          profileUrl: me.profileUrl,
        },
      });
    }
    setValue('');
  };

  const formatReadCount = (readUsersId: number[]) => {
    if (!me) return;
    let ids = [...readUsersId];
    if (!ids.includes(+me.id)) {
      ids.push(+me.id);
    }
    const roomUserIds =
      room?.roomDetail.room?.users?.map(user => user.id) ?? [];
    return roomUserIds.filter(id => ids.includes(+id)).length;
  };

  const deleteRoomFn = async () => {
    const {data} = await deleteRoom({
      variables: {
        input: {
          roomId: +route.params.roomId,
        },
      },
    });
    if (data?.deleteRoom.ok) {
      removeMyRoom(route.params.roomId);
      navigation.reset({routes: [{name: MainNavigatorScreens.Home}]});
    }
  };

  useNewMessageListener({
    variables: {input: {roomId: +route.params.roomId}},
    onData: ({data}) =>
      data.data?.newMessage && appendMessageFn(data.data?.newMessage),
  });
  useReadMessageListener({
    variables: {input: {roomId: +route.params.roomId}},
    onData: ({data}) => updateReadMessages(data.data?.readMessage.messages),
  });

  return (
    <ScrollView>
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
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
      </View>
      <View>
        {message?.viewMessages.messages?.map(m => (
          <Text key={m.id}>
            {m.user.nickname}: {m.contents} (read:{' '}
            {formatReadCount(m.readUsersId)})
          </Text>
        ))}
      </View>
      <TextInput
        style={{borderStyle: 'solid', borderWidth: 1, borderColor: 'black'}}
        value={value}
        onChange={e => setValue(e.nativeEvent.text)}
      />
      <Button title="전송" onPress={sendMessageFn} />
      {message?.viewMessages.hasNext && (
        <Button title="더 불러오기" onPress={fetchMore} />
      )}
      <Button title="나가기" onPress={deleteRoomFn} />
    </ScrollView>
  );
};

export default ChatRoomScreen;
