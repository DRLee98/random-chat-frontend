import {useNavigation} from '@react-navigation/native';

import {View, Text} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import ProfileImg from '@app/components/common/ProfileImg';
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
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 10,
        marginHorizontal: 15,
      }}>
      <TouchableOpacity onPress={goChatRoom}>
        <View style={{flexDirection: 'row', gap: 10}}>
          <ProfileImg url={userRoom.users[0].profileUrl} size={50} />
          <View style={{justifyContent: 'center', gap: 8}}>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Text style={{fontWeight: '700'}}>{userRoom.name}</Text>
              <Text>{new Date(userRoom.room.updatedAt).toDateString()}</Text>
            </View>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Text>{userRoom.lastMessage}</Text>
              {userRoom.newMessage > 0 && (
                <View
                  style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    paddingVertical: 2,
                    paddingHorizontal: 6,
                    backgroundColor: 'red',
                    borderRadius: 10,
                  }}>
                  <Text style={{color: '#fff', fontWeight: '600'}}>
                    {userRoom.newMessage}
                  </Text>
                </View>
              )}
            </View>
          </View>
        </View>
      </TouchableOpacity>
      {/* <View style={{flexDirection: 'row', alignItems: 'center', gap: 20}}>
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
      </View> */}
    </View>
  );
};

export default RoomItem;
