import {useEffect} from 'react';
import useMyRooms from '@app/graphql/hooks/useMyRooms';
import useCreateRandomRoom from '@app/graphql/hooks/useCreateRandomRoom';
import useNewRoomListener from '@app/graphql/hooks/useNewRoomListener';

import {View, Text, Button} from 'react-native';

import {MainNavigatorScreens} from '@app/navigators';

import type {StackScreenProps} from '@react-navigation/stack';
import type {MainNavigatorParamList} from '@app/navigators';
import type {UserRoomObjectType} from '@app/graphql/types/graphql';

interface HomeScreenProps
  extends StackScreenProps<MainNavigatorParamList, MainNavigatorScreens.Home> {}

const HomeScreen = (props: HomeScreenProps) => {
  const [myRooms, result] = useMyRooms();
  const [createRandomRoom] = useCreateRandomRoom();

  const updateRoom = (newRoom?: UserRoomObjectType) => {
    if (!newRoom) return;
    const {id, name, noti, pinned, newMessage} = newRoom;
    result.updateQuery(prev => ({
      ...prev,
      myRooms: {
        ...prev.myRooms,
        rooms: [
          {id, name, noti, pinned, newMessage, lastMessage: ''},
          ...(prev.myRooms.rooms ?? []),
        ],
      },
    }));
  };

  useNewRoomListener({onData: ({data}) => updateRoom(data.data)});

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
      <Text>Home</Text>
      <Button title="create room" onPress={() => createRandomRoom()} />
      {result.data?.myRooms?.rooms?.map(room => (
        <Text key={room.id}>{room.name}</Text>
      ))}
    </View>
  );
};

export default HomeScreen;
