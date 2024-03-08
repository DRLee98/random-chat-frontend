import {useNavigation} from '@react-navigation/native';
import {useUpdateMyRoom} from '@app/graphql/hooks/room/useMyRooms';
import useUpdateRoom from '@app/graphql/hooks/room/useUpdateRoom';

import {View, Text} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import {MainNavigatorScreens} from '@app/navigators';

import type {NavigationProp} from '@react-navigation/native';
import type {MainNavigatorParamList} from '@app/navigators';
import type {MyRoom} from '@app/graphql/types/graphql';

interface RoomItemProps {
  userRoom: MyRoom;
}

const RoomItem = ({userRoom}: RoomItemProps) => {
  const navigation = useNavigation<NavigationProp<MainNavigatorParamList>>();

  const [updateRoom] = useUpdateRoom();
  const {updateMyRoom, sortMyRooms} = useUpdateMyRoom();

  const goChatRoom = () => {
    navigation.navigate(MainNavigatorScreens.ChatRoom, {
      roomId: userRoom.room.id,
    });
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
      sortMyRooms();
    }
  };

  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 10,
        marginHorizontal: 15,
      }}>
      <TouchableOpacity onPress={goChatRoom}>
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
  );
};

export default RoomItem;
