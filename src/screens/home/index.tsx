import useMyRooms from '@app/graphql/hooks/room/useMyRooms';
import useCreateRandomRoom from '@app/graphql/hooks/room/useCreateRandomRoom';
import useNewRoomListener from '@app/graphql/hooks/room/useNewRoomListener';
import useUpdateNewMessageListener from '@app/graphql/hooks/message/useUpdateNewMessageListener';
import useLogout from '@app/hooks/useLogout';

import {Text, Button, ScrollView} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';

import {MainNavigatorScreens} from '@app/navigators';

import type {StackScreenProps} from '@react-navigation/stack';
import type {MainNavigatorParamList} from '@app/navigators';
import type {
  UpdateNewMessageInUserRoom,
  MyRoom,
} from '@app/graphql/types/graphql';

interface HomeScreenProps
  extends StackScreenProps<MainNavigatorParamList, MainNavigatorScreens.Home> {}

const HomeScreen = ({navigation}: HomeScreenProps) => {
  const logout = useLogout();
  const [createRandomRoom] = useCreateRandomRoom();
  const {
    data: myRoomsData,
    updateQuery,
    fetchMore,
    refetch,
  } = useMyRooms({
    take: 30,
  });

  const goChatRoom = (roomId: string) => {
    navigation.navigate(MainNavigatorScreens.ChatRoom, {roomId});
  };

  const updateRoom = (newRoom?: MyRoom) => {
    if (!newRoom) return;
    updateQuery(prev => ({
      ...prev,
      myRooms: {
        ...prev.myRooms,
        rooms: [newRoom, ...(prev.myRooms.rooms ?? [])],
      },
    }));
  };

  const updateNewMessage = (data?: UpdateNewMessageInUserRoom) => {
    if (!data) return;
    const {id, newMessage, lastMessage} = data;
    updateQuery(prev => ({
      ...prev,
      myRooms: {
        ...prev.myRooms,
        rooms: prev.myRooms.rooms?.map(room => {
          if (room.id === id) {
            return {
              ...room,
              newMessage,
              lastMessage,
            };
          }
          return room;
        }),
      },
    }));
  };

  const createRandomRoomFn = async () => {
    const {data} = await createRandomRoom();
    if (data?.createRandomRoom.room) {
      const userRoom = data.createRandomRoom.room as MyRoom;
      updateRoom(userRoom);
      goChatRoom(userRoom.room.id);
    }
  };

  useNewRoomListener({
    onData: ({data}) => updateRoom(data.data?.newRoom as MyRoom),
  });
  useUpdateNewMessageListener({
    onData: ({data}) => updateNewMessage(data.data?.updateNewMessageInUserRoom),
  });

  return (
    <ScrollView>
      <Button title="logout" onPress={logout} />
      <Button title="채팅방 생성" onPress={createRandomRoomFn} />
      <Button title="새로고침" onPress={() => refetch()} />
      {myRoomsData?.myRooms?.rooms?.map(userRoom => (
        <TouchableOpacity
          key={userRoom.id}
          onPress={() => goChatRoom(userRoom.room.id)}
          style={{marginVertical: 10}}>
          <Text>{userRoom.name}</Text>
          <Text>new message: {userRoom.newMessage}</Text>
          <Text>last message: {userRoom.lastMessage}</Text>
        </TouchableOpacity>
      ))}
      {myRoomsData?.myRooms.hasNext && (
        <Button title="더 불러오기" onPress={fetchMore} />
      )}
    </ScrollView>
  );
};

export default HomeScreen;
