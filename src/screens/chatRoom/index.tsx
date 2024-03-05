import {useState} from 'react';
import useRoomDetail from '@app/graphql/hooks/room/useRoomDetail';
import useDeleteRoom from '@app/graphql/hooks/room/useDeleteRoom';
import useViewMessages from '@app/graphql/hooks/message/useViewMessages';
import useNewMessageListener from '@app/graphql/hooks/message/useNewMessageListener';
import useReadMessageListener from '@app/graphql/hooks/message/useReadMessageListener';
import useSendMessage from '@app/graphql/hooks/message/useSendMessage';
import useMe from '@app/graphql/hooks/user/useMe';

import {Button, ScrollView, Text, TextInput, View} from 'react-native';

import {MY_ROOMS} from '@app/graphql/hooks/room/useMyRooms';

import {MainNavigatorScreens} from '@app/navigators';
import {MessageType} from '@app/graphql/types/graphql';

import type {StackScreenProps} from '@react-navigation/stack';
import type {MainNavigatorParamList} from '@app/navigators';
import type {MessageBaseFragment, Messages} from '@app/graphql/types/graphql';

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

  const {me} = useMe();

  const room = useRoomDetail({roomId: +route.params.roomId});
  const message = useViewMessages({
    roomId: +route.params.roomId,
    take: 5,
  });

  const [sendMessage] = useSendMessage();
  const [deleteRoom] = useDeleteRoom();

  const appendMessage = (newMessage?: MessageBaseFragment) => {
    if (!newMessage) return;
    message.updateQuery(prev => ({
      ...prev,
      viewMessages: {
        ...prev.viewMessages,
        messages: [...(prev.viewMessages.messages ?? []), newMessage],
      },
    }));
  };

  const updateReadMessages = (messages?: Messages[]) => {
    if (!messages || messages.length === 0) return;
    message.updateQuery(prev => ({
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

  useNewMessageListener({
    variables: {input: {roomId: +route.params.roomId}},
    onData: ({data}) => appendMessage(data.data?.newMessage),
  });
  useReadMessageListener({
    variables: {input: {roomId: +route.params.roomId}},
    onData: ({data}) => updateReadMessages(data.data?.readMessage.messages),
  });

  const sendMessageFn = async () => {
    if (!me) return;
    const result = await sendMessage({
      variables: {
        input: {
          roomId: +route.params.roomId,
          contents: value,
          type: MessageType.Text,
        },
      },
    });
    if (result.data?.sendMessage.messageId) {
      appendMessage({
        __typename: 'MessageObjectType',
        id: result.data.sendMessage.messageId + '',
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
    const result = await deleteRoom({
      variables: {
        input: {
          roomId: +route.params.roomId,
        },
      },
      refetchQueries: [MY_ROOMS],
      awaitRefetchQueries: true,
    });
    if (result.data?.deleteRoom.ok) {
      navigation.replace(MainNavigatorScreens.Home);
    }
  };

  const formatReadCount = (readUsersId: number[]) => {
    if (!me) return;
    let ids = [...readUsersId];
    if (!ids.includes(+me.id)) {
      ids.push(+me.id);
    }

    const roomUserIds =
      room.data?.roomDetail.room?.users?.map(user => user.id) ?? [];
    const readCount = roomUserIds.filter(id => ids.includes(+id)).length;

    return readCount;
  };

  return (
    <ScrollView>
      <Text>
        Chat Room: {room.data?.roomDetail.room?.name}, id: {route.params.roomId}
      </Text>
      <View style={{marginVertical: 20}}>
        {room.data?.roomDetail.room?.users?.map(user => (
          <View key={user.id}>
            <Text>
              id: {user.id}, nick: {user.nickname}
            </Text>
          </View>
        ))}
      </View>
      <View>
        {message.data?.viewMessages.messages?.map(m => (
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
      <Button title="더 불러오기" onPress={message.fetchMore} />
      <Button title="나가기" onPress={deleteRoomFn} />
    </ScrollView>
  );
};

export default ChatRoomScreen;
