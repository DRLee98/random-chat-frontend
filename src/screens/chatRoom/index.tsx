import {useState} from 'react';
import {useApolloClient} from '@apollo/client';
import useRoomDetail from '@app/graphql/hooks/room/useRoomDetail';
import useDeleteRoom from '@app/graphql/hooks/room/useDeleteRoom';
import useViewMessages from '@app/graphql/hooks/message/useViewMessages';
import useNewMessageListener from '@app/graphql/hooks/message/useNewMessageListener';
import useReadMessageListener from '@app/graphql/hooks/message/useReadMessageListener';
import useSendMessage from '@app/graphql/hooks/message/useSendMessage';
import useMe from '@app/graphql/hooks/user/useMe';

import {Button, ScrollView, Text, TextInput, View} from 'react-native';
import ToggleUserBlockButton from '@app/components/user/ToggleUserBlockButton';

import {MY_ROOMS} from '@app/graphql/hooks/room/useMyRooms';

import {MainNavigatorScreens} from '@app/navigators';
import {MessageType} from '@app/graphql/types/graphql';

import type {StackScreenProps} from '@react-navigation/stack';
import type {MainNavigatorParamList} from '@app/navigators';
import type {
  MessageBaseFragment,
  Messages,
  MyRoomsQuery,
  MyRoomsQueryVariables,
} from '@app/graphql/types/graphql';

export interface ChatRoomScreenParams {
  roomId: string;
}

interface ChatRoomScreenProps
  extends StackScreenProps<
    MainNavigatorParamList,
    MainNavigatorScreens.ChatRoom
  > {}

const ChatRoomScreen = ({route, navigation}: ChatRoomScreenProps) => {
  const {cache} = useApolloClient();

  const [value, setValue] = useState('');

  const [sendMessage] = useSendMessage();
  const [deleteRoom] = useDeleteRoom();

  const {me} = useMe();
  const {data: room} = useRoomDetail({roomId: +route.params.roomId});
  const {
    data: message,
    updateQuery,
    fetchMore,
  } = useViewMessages({
    roomId: +route.params.roomId,
    take: 50,
  });

  const appendMessage = (newMessage?: MessageBaseFragment) => {
    if (!newMessage) return;
    updateQuery(prev => ({
      ...prev,
      viewMessages: {
        ...prev.viewMessages,
        messages: [...(prev.viewMessages.messages ?? []), newMessage],
      },
    }));
    cache.updateQuery<MyRoomsQuery, MyRoomsQueryVariables>(
      {query: MY_ROOMS, variables: {input: {}}},
      prev => {
        if (!prev) return prev;
        const newRooms: MyRoomsQuery['myRooms']['rooms'] = [];
        prev?.myRooms.rooms?.forEach(room => {
          if (room.room.id === route.params.roomId) {
            newRooms.unshift({
              ...room,
              lastMessage: newMessage.contents,
            });
            return;
          }
          newRooms.push(room);
        });
        return {
          ...prev,
          myRooms: {
            ...prev.myRooms,
            rooms: newRooms,
          },
        };
      },
    );
  };

  const updateReadMessages = (messages?: Messages[]) => {
    if (!messages || messages.length === 0) return;
    updateQuery(prev => ({
      ...prev,
      viewMessages: {
        ...prev.viewMessages,
        messages: prev.viewMessages.messages?.map(m => {
          const findMessage = messages.find(msg => msg.id === m.id);
          if (findMessage)
            return {
              ...m,
              readUsersId: findMessage.readUsersId,
            };
          return m;
        }),
      },
    }));
  };

  const sendMessageFn = async () => {
    if (!me) return;
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
      appendMessage({
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

  const deleteRoomFn = async () => {
    const {data} = await deleteRoom({
      variables: {
        input: {
          roomId: +route.params.roomId,
        },
      },
    });
    if (data?.deleteRoom.ok) {
      cache.updateQuery<MyRoomsQuery, MyRoomsQueryVariables>(
        {query: MY_ROOMS, variables: {input: {}}},
        prev =>
          prev && {
            ...prev,
            myRooms: {
              ...prev.myRooms,
              rooms: prev.myRooms.rooms?.filter(
                room => room.room.id !== route.params.roomId,
              ),
            },
          },
      );
      navigation.reset({routes: [{name: MainNavigatorScreens.Home}]});
    }
  };

  const formatReadCount = (readUsersId: number[]) => {
    if (!me) return;
    let ids = [...readUsersId];
    if (!ids.includes(+me.id)) {
      ids.push(+me.id);
    }

    const roomUserIds =
      room?.roomDetail.room?.users?.map(user => user.id) ?? [];
    const readCount = roomUserIds.filter(id => ids.includes(+id)).length;

    return readCount;
  };

  useNewMessageListener({
    variables: {input: {roomId: +route.params.roomId}},
    onData: ({data}) => appendMessage(data.data?.newMessage),
  });
  useReadMessageListener({
    variables: {input: {roomId: +route.params.roomId}},
    onData: ({data}) => updateReadMessages(data.data?.readMessage.messages),
  });

  return (
    <ScrollView>
      <Text>
        Chat Room: {room?.roomDetail.room?.name}, id: {route.params.roomId}
      </Text>
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
