import useMyRooms from '@app/graphql/hooks/room/useMyRooms';
import useCreateRandomRoom from '@app/graphql/hooks/room/useCreateRandomRoom';
import useNewRoomListener from '@app/graphql/hooks/room/useNewRoomListener';
import useUpdateNewMessageListener from '@app/graphql/hooks/message/useUpdateNewMessageListener';

import {View, Text, Button} from 'react-native';
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
  const [createRandomRoom] = useCreateRandomRoom();
  const {data: myRoomsData, updateQuery} = useMyRooms({
    page: 1,
    take: 10,
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
    console.log(data);
    if (data?.createRandomRoom.room) {
      const userRoom = data.createRandomRoom.room as MyRoom;
      updateRoom(userRoom);
      goChatRoom(userRoom.room.id);
    }
  };

  useNewRoomListener({onData: ({data}) => updateRoom(data.data)});
  useUpdateNewMessageListener({
    onData: ({data}) => updateNewMessage(data.data),
  });

  return (
    <View>
      <Button title="create room" onPress={createRandomRoomFn} />
      {myRoomsData?.myRooms?.rooms?.map(userRoom => (
        <TouchableOpacity
          key={userRoom.id}
          onPress={() => goChatRoom(userRoom.room.id)}>
          <Text>{userRoom.name}</Text>
          <Text>new message: {userRoom.newMessage}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default HomeScreen;
