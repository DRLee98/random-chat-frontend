import {useNavigation} from '@react-navigation/native';

import {View, Text} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import PinnedButton from './PinnedButton';
import NotiButton from './NotiButton';

import {MainNavigatorScreens} from '@app/navigators';

import type {NavigationProp} from '@react-navigation/native';
import type {MainNavigatorParamList} from '@app/navigators';
import type {MyRoom} from '@app/graphql/types/graphql';

interface RoomItemProps {
  userRoom: MyRoom;
}

const RoomItem = ({userRoom}: RoomItemProps) => {
  const navigation = useNavigation<NavigationProp<MainNavigatorParamList>>();

  const goChatRoom = () => {
    navigation.navigate(MainNavigatorScreens.ChatRoom, {
      roomId: userRoom.room.id,
    });
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
        <PinnedButton
          roomId={userRoom.room.id}
          userRoomId={userRoom.id}
          pinned={Boolean(userRoom.pinnedAt)}
        />
        <NotiButton
          roomId={userRoom.room.id}
          userRoomId={userRoom.id}
          noti={userRoom.noti}
        />
      </View>
    </View>
  );
};

export default RoomItem;
