import {useEffect} from 'react';
import useMyRooms from '@app/graphql/hooks/useMyRooms';
import useCreateRandomRoom from '@app/graphql/hooks/useCreateRandomRoom';
import useNewRoomListener from '@app/graphql/hooks/useNewRoomListener';
import useUpdateNewMessageListener from '@app/graphql/hooks/useUpdateNewMessageListener';

import {View, Text, Button} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';

import {MainNavigatorScreens} from '@app/navigators';

import type {StackScreenProps} from '@react-navigation/stack';
import type {MainNavigatorParamList} from '@app/navigators';
import type {
  UserRoomObjectType,
  UpdateNewMessageInUserRoom,
  MyRoom,
} from '@app/graphql/types/graphql';

interface HomeScreenProps
  extends StackScreenProps<MainNavigatorParamList, MainNavigatorScreens.Home> {}

const HomeScreen = ({navigation}: HomeScreenProps) => {
  const [myRooms, result] = useMyRooms();
  const [createRandomRoom] = useCreateRandomRoom();

  const goChatRoom = (roomId: string) => {
    navigation.navigate(MainNavigatorScreens.ChatRoom, {roomId});
  };

  const updateRoom = (newRoom?: MyRoom) => {
    if (!newRoom) return;
    result.updateQuery(prev => ({
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
    result.updateQuery(prev => ({
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

  useNewRoomListener({onData: ({data}) => updateRoom(data.data)});
  useUpdateNewMessageListener({
    onData: ({data}) => updateNewMessage(data.data),
  });

  useEffect(() => {
    myRooms({
      input: {
        page: 1,
        take: 10,
      },
    });
  }, []);

  return (
    <View>
      <Button title="create room" onPress={createRandomRoomFn} />
      {result.data?.myRooms?.rooms?.map(userRoom => (
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
