import {useState} from 'react';
import useMyRooms, {useUpdateMyRooms} from '@app/graphql/hooks/room/useMyRooms';
import useNewRoomListener from '@app/graphql/hooks/room/useNewRoomListener';
import useUpdateNewMessageListener from '@app/graphql/hooks/message/useUpdateNewMessageListener';

import styled from 'styled-components/native';
import RoomItem from '@app/components/room/RoomItem';
import Skeleton from '@app/components/common/Skeleton';
import CreateRoomButton from '@app/components/room/CreateRoomButton';

import {MainNavigatorScreens} from '@app/navigators';

import type {StackScreenProps} from '@react-navigation/stack';
import type {MainNavigatorParamList} from '@app/navigators';
import type {
  FlatListProps,
  NativeScrollEvent,
  NativeSyntheticEvent,
} from 'react-native';
import type {
  MyRoomBaseFragment,
  UpdateNewMessageInUserRoom,
} from '@app/graphql/__generated__/graphql';

interface HomeScreenProps
  extends StackScreenProps<MainNavigatorParamList, MainNavigatorScreens.Home> {}

const HomeScreen = (props: HomeScreenProps) => {
  const {rooms, fetchMore, hasNext, loading} = useMyRooms();
  const {updateMyRoom, appendMyRoom, sortMyRooms} = useUpdateMyRooms();

  const [simpleButton, setSimpleButton] = useState(false);

  const onScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    setSimpleButton(e.nativeEvent.contentOffset.y > 150);
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

  if (loading) return <Container />;
  return (
    <Container>
      {rooms.length > 0 && (
        <FixedButton>
          <CreateRoomButton simple={simpleButton} />
        </FixedButton>
      )}
      <List
        onScroll={onScroll}
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
        ListEmptyComponent={
          <EmptyBox>
            <CreateRoomButton simple size={50} />
            <EmptyText>{`위의 버튼을 눌러\n랜덤으로 채팅방을 생성해\n대화를 시작해보세요!`}</EmptyText>
          </EmptyBox>
        }
        onEndReached={fetchMore}
        onEndReachedThreshold={0.5}
      />
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
  position: relative;
  background-color: ${({theme}) => theme.bgColor};
`;

const List = styled.FlatList<FlatListProps<MyRoomBaseFragment>>``;

const Footer = styled.View`
  height: 30px;
`;

const SkeletonContainer = styled.View`
  padding: 0 15px;
`;

const EmptyBox = styled.View`
  align-items: center;
  justify-content: center;
  gap: 10px;

  width: 100%;
  aspect-ratio: 1;
`;

const EmptyText = styled.Text`
  text-align: center;
  font-size: 16px;
  line-height: 25px;
  color: ${({theme}) => theme.fontColor};
`;

const FixedButton = styled.SafeAreaView`
  position: absolute;
  bottom: 40px;
  right: 20px;
  z-index: 1;
`;

export default HomeScreen;
