import useMyRooms, {useUpdateMyRooms} from '@app/graphql/hooks/room/useMyRooms';
import useCreateRandomRoom from '@app/graphql/hooks/room/useCreateRandomRoom';
import useNewRoomListener from '@app/graphql/hooks/room/useNewRoomListener';
import useUpdateNewMessageListener from '@app/graphql/hooks/message/useUpdateNewMessageListener';
import useLogout from '@app/hooks/useLogout';

import {Button, ScrollView} from 'react-native';
import RoomItem from '@app/components/room/RoomItem';

import {MainNavigatorScreens} from '@app/navigators';

import type {StackScreenProps} from '@react-navigation/stack';
import type {MainNavigatorParamList} from '@app/navigators';
import type {
  UpdateNewMessageInUserRoom,
  MyRoom,
} from '@app/graphql/types/graphql';
import styled from 'styled-components/native';

interface HomeScreenProps
  extends StackScreenProps<MainNavigatorParamList, MainNavigatorScreens.Home> {}

const HomeScreen = ({navigation}: HomeScreenProps) => {
  const logout = useLogout();

  const [createRandomRoom] = useCreateRandomRoom();

  const {data: myRoomsData, fetchMore, refetch} = useMyRooms();
  const {updateMyRoom, appendMyRoom, sortMyRooms} = useUpdateMyRooms();

  const goChatRoom = (roomId: string) => {
    navigation.navigate(MainNavigatorScreens.ChatRoom, {roomId});
  };

  const createRandomRoomFn = async () => {
    const {data} = await createRandomRoom();
    if (data?.createRandomRoom.room) {
      const userRoom = data.createRandomRoom.room as MyRoom;
      appendMyRoom(userRoom);
      sortMyRooms();
      goChatRoom(userRoom.room.id);
    }
  };

  const updateNewMessage = (data?: UpdateNewMessageInUserRoom) => {
    if (!data) return;
    const {id, newMessage, lastMessage} = data;
    updateMyRoom(id, {newMessage, lastMessage});
  };

  useNewRoomListener({
    onData: ({data}) =>
      data.data?.newRoom && appendMyRoom(data.data.newRoom as MyRoom),
  });
  useUpdateNewMessageListener({
    onData: ({data}) => updateNewMessage(data.data?.updateNewMessageInUserRoom),
  });

  return (
    <Container>
      <Button title="logout" onPress={logout} />
      <Button title="채팅방 생성" onPress={createRandomRoomFn} />
      <Button title="새로고침" onPress={() => refetch()} />
      {myRoomsData?.myRooms?.rooms?.map(userRoom => (
        <RoomItem key={userRoom.id} userRoom={userRoom as MyRoom} />
      ))}
      {myRoomsData?.myRooms.hasNext && (
        <Button title="더 불러오기" onPress={fetchMore} />
      )}
    </Container>
  );
};

const Container = styled.ScrollView`
  background-color: ${({theme}) => theme.bgColor};
`;

export default HomeScreen;
