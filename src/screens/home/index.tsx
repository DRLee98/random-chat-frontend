import useMyRooms from '@app/graphql/hooks/room/useMyRooms';
import useCreateRandomRoom from '@app/graphql/hooks/room/useCreateRandomRoom';
import useUpdateRoom from '@app/graphql/hooks/room/useUpdateRoom';
import useNewRoomListener from '@app/graphql/hooks/room/useNewRoomListener';
import useUpdateNewMessageListener from '@app/graphql/hooks/message/useUpdateNewMessageListener';
import useLogout from '@app/hooks/useLogout';

import {View, Text, Button, ScrollView} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import {MainNavigatorScreens} from '@app/navigators';

import {DateStringToNumber} from '@app/utils/functions';

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
  const [updateRoom] = useUpdateRoom();
  const {data: myRoomsData, updateQuery, fetchMore, refetch} = useMyRooms();

  const goChatRoom = (roomId: string) => {
    navigation.navigate(MainNavigatorScreens.ChatRoom, {roomId});
  };

  const appendMyRooms = (newRoom?: MyRoom) => {
    if (!newRoom) return;
    updateQuery(prev => ({
      ...prev,
      myRooms: {
        ...prev.myRooms,
        rooms: [newRoom, ...(prev.myRooms.rooms ?? [])],
      },
    }));
  };

  const updateMyRoom = (roomId: string, newRoom: Partial<MyRoom>) => {
    updateQuery(prev => ({
      ...prev,
      myRooms: {
        ...prev.myRooms,
        rooms: prev.myRooms.rooms?.map(room => {
          if (room.id === roomId) {
            return {...room, ...newRoom};
          }
          return room;
        }),
      },
    }));
  };

  const updateNewMessage = (data?: UpdateNewMessageInUserRoom) => {
    if (!data) return;
    const {id, newMessage, lastMessage} = data;
    updateMyRoom(id, {newMessage, lastMessage});
  };

  const createRandomRoomFn = async () => {
    const {data} = await createRandomRoom();
    if (data?.createRandomRoom.room) {
      const userRoom = data.createRandomRoom.room as MyRoom;
      appendMyRooms(userRoom);
      goChatRoom(userRoom.room.id);
    }
  };

  const onToggleNoti = async (userRoomId: string, noti: boolean) => {
    const {data} = await updateRoom({
      variables: {
        input: {
          userRoomId: +userRoomId,
          noti,
        },
      },
    });
    if (data?.updateRoom.ok) {
      updateMyRoom(userRoomId, {noti});
    }
  };

  const onTogglePinned = async (userRoomId: string, pinned: boolean) => {
    const {data} = await updateRoom({
      variables: {
        input: {
          userRoomId: +userRoomId,
          pinned,
        },
      },
    });
    if (data?.updateRoom.ok) {
      updateMyRoom(userRoomId, {pinnedAt: pinned ? new Date() : null});
      updateQuery(prev => ({
        ...prev,
        myRooms: {
          ...prev.myRooms,
          rooms: [...(prev.myRooms.rooms ?? [])].sort(
            (a, b) =>
              DateStringToNumber(b.pinnedAt) - DateStringToNumber(a.pinnedAt),
          ),
        },
      }));
    }
  };

  useNewRoomListener({
    onData: ({data}) => appendMyRooms(data.data?.newRoom as MyRoom),
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
        <View
          key={userRoom.id}
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginVertical: 10,
            marginHorizontal: 15,
          }}>
          <TouchableOpacity onPress={() => goChatRoom(userRoom.room.id)}>
            <Text>{userRoom.name}</Text>
            <Text>new message: {userRoom.newMessage}</Text>
            <Text>last message: {userRoom.lastMessage}</Text>
          </TouchableOpacity>
          <View style={{flexDirection: 'row', alignItems: 'center', gap: 20}}>
            <TouchableOpacity
              onPress={() =>
                onTogglePinned(userRoom.id, !Boolean(userRoom.pinnedAt))
              }>
              <Icon
                name={Boolean(userRoom.pinnedAt) ? 'pin' : 'pin-off-outline'}
                size={20}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => onToggleNoti(userRoom.id, !userRoom.noti)}>
              <Icon
                name={userRoom.noti ? 'bell-ring' : 'bell-cancel-outline'}
                size={20}
              />
            </TouchableOpacity>
          </View>
        </View>
      ))}
      {myRoomsData?.myRooms.hasNext && (
        <Button title="더 불러오기" onPress={fetchMore} />
      )}
    </ScrollView>
  );
};

export default HomeScreen;
