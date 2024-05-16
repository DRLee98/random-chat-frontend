import useMyRooms, {useUpdateMyRooms} from '@app/graphql/hooks/room/useMyRooms';
import useCreateRandomRoom from '@app/graphql/hooks/room/useCreateRandomRoom';
import useNewRoomListener from '@app/graphql/hooks/room/useNewRoomListener';
import useUpdateNewMessageListener from '@app/graphql/hooks/message/useUpdateNewMessageListener';
import {useModal} from '@app/contexts/modalContext';

import styled, {useTheme} from 'styled-components/native';
import RoomItem from '@app/components/room/RoomItem';
import Skeleton from '@app/components/common/Skeleton';
import Icon from 'react-native-vector-icons/FontAwesome5';

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
  const theme = useTheme();
  const showModal = useModal();

  const [createRandomRoom, {loading}] = useCreateRandomRoom();

  const {rooms, fetchMore, hasNext} = useMyRooms();
  const {updateMyRoom, appendMyRoom, sortMyRooms} = useUpdateMyRooms();

  const goChatRoom = (item: MyRoomBaseFragment) => {
    navigation.navigate(MainNavigatorScreens.ChatRoom, {
      roomId: item.room.id,
      newMessageCount: item.newMessage,
    });
  };

  const createRandomRoomFn = async () => {
    const {data} = await createRandomRoom();
    if (data?.createRandomRoom.room) {
      const userRoom = data.createRandomRoom.room;
      appendMyRoom(userRoom);
      sortMyRooms();

      const userRoomData = getFragmentData(MY_ROOM_BASE, userRoom);
      goChatRoom(userRoomData);
    }
    if (data?.createRandomRoom.error) {
      showModal({
        title: '랜덤 채팅방 생성에 실패했어요',
        message: data.createRandomRoom.error,
        buttons: [{text: '확인'}],
      });
    }
  };

  const updateNewMessage = (data?: UpdateNewMessageInUserRoom) => {
    if (!data) return;
    const {id, newMessage, lastMessage} = data;
    updateMyRoom(id, {newMessage, lastMessage}, {updatedAt: new Date()});
    sortMyRooms();
  };

  useNewRoomListener({
    onData: ({data}) => data.data?.newRoom && appendMyRoom(data.data.newRoom),
  });
  useUpdateNewMessageListener({
    onData: ({data}) => updateNewMessage(data.data?.updateNewMessageInUserRoom),
  });

  return (
    <Container>
      <CreateRoomButton onPress={createRandomRoomFn} disabled={loading}>
        {loading ? (
          <Loading size={30} color={theme.bgColor} />
        ) : (
          <Icon name="dice" size={30} color={theme.bgColor} />
        )}
        <CreateRoomText>랜덤 채팅방 생성</CreateRoomText>
      </CreateRoomButton>
      <List
        data={rooms}
        renderItem={({item}) => <RoomItem userRoom={item} />}
        keyExtractor={item => item.id}
        ListFooterComponent={
          <>
            {hasNext && (
              <SkeletonContainer>
                <Skeleton height={60} borderRadius={10} />
              </SkeletonContainer>
            )}
            <Footer />
          </>
        }
        onEndReached={fetchMore}
        onEndReachedThreshold={0.5}
      />
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
  background-color: ${({theme}) => theme.bgColor};
`;

const List = styled.FlatList<FlatListProps<MyRoomBaseFragment>>``;

const Footer = styled.View`
  height: 30px;
`;

const CreateRoomButton = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 15px;

  margin: 0px 20px;
  margin-bottom: 10px;
  padding: 15px;

  background-color: ${({theme}) => theme.primary.default};
  border-radius: 999px;
`;

const Loading = styled.ActivityIndicator``;

const CreateRoomText = styled.Text`
  font-size: 16px;
  font-weight: bold;
  color: ${({theme}) => theme.bgColor};
`;

const SkeletonContainer = styled.View`
  padding: 0 15px;
`;

export default HomeScreen;
