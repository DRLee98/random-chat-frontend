import useMyRooms, {useUpdateMyRooms} from '@app/graphql/hooks/room/useMyRooms';
import useCreateRandomRoom from '@app/graphql/hooks/room/useCreateRandomRoom';
import useNewRoomListener from '@app/graphql/hooks/room/useNewRoomListener';
import useUpdateNewMessageListener from '@app/graphql/hooks/message/useUpdateNewMessageListener';

import styled from 'styled-components/native';
import {Button} from 'react-native';
import RoomItem from '@app/components/room/RoomItem';

import {getFragmentData} from '@app/graphql/__generated__';
import {MY_ROOM_BASE} from '@app/graphql/fragments/room';

import {MainNavigatorScreens} from '@app/navigators';

import type {StackScreenProps} from '@react-navigation/stack';
import type {MainNavigatorParamList} from '@app/navigators';
import type {FlatListProps} from 'react-native';
import type {
  MyRoomBaseFragment,
  UpdateNewMessageInUserRoom,
} from '@app/graphql/__generated__/graphql';

interface HomeScreenProps
  extends StackScreenProps<MainNavigatorParamList, MainNavigatorScreens.Home> {}

const HomeScreen = ({navigation}: HomeScreenProps) => {
  const [createRandomRoom] = useCreateRandomRoom();

  const {rooms, fetchMore, refetch, loading} = useMyRooms();
  const {updateMyRoom, appendMyRoom, sortMyRooms} = useUpdateMyRooms();

  const goChatRoom = (roomId: string) => {
    navigation.navigate(MainNavigatorScreens.ChatRoom, {roomId});
  };

  const createRandomRoomFn = async () => {
    const {data} = await createRandomRoom();
    if (data?.createRandomRoom.room) {
      const userRoom = data.createRandomRoom.room;
      appendMyRoom(userRoom);
      sortMyRooms();

      const userRoomData = getFragmentData(MY_ROOM_BASE, userRoom);
      goChatRoom(userRoomData.room.id);
    }
  };

  const updateNewMessage = (data?: UpdateNewMessageInUserRoom) => {
    if (!data) return;
    const {id, newMessage, lastMessage} = data;
    updateMyRoom(id, {newMessage, lastMessage}, {updatedAt: new Date()});
  };

  useNewRoomListener({
    onData: ({data}) => data.data?.newRoom && appendMyRoom(data.data.newRoom),
  });
  useUpdateNewMessageListener({
    onData: ({data}) => updateNewMessage(data.data?.updateNewMessageInUserRoom),
  });

  return (
    <Container
      data={rooms}
      renderItem={({item}) => <RoomItem userRoom={item} />}
      keyExtractor={item => item.id}
      ListHeaderComponent={
        <Button title="채팅방 생성" onPress={createRandomRoomFn} />
      }
      onEndReached={fetchMore}
      onEndReachedThreshold={0.5}
    />
  );
};

const Container = styled.FlatList<FlatListProps<MyRoomBaseFragment>>`
  width: 100%;
  background-color: ${({theme}) => theme.bgColor};
`;

export default HomeScreen;
