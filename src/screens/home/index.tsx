import {useEffect, useState} from 'react';
import {useModal} from '@app/contexts/modalContext';
import useMyRooms, {useUpdateMyRooms} from '@app/graphql/hooks/room/useMyRooms';
import useMyInvites, {
  useUpdateMyInvites,
} from '@app/graphql/hooks/invite/useMyInvites';
import useNewRoomListener from '@app/graphql/hooks/room/useNewRoomListener';
import useUpdateNewMessageListener from '@app/graphql/hooks/message/useUpdateNewMessageListener';
import useUpdateInviteStatusListener from '@app/graphql/hooks/invite/useUpdateInviteStatusListener';
import useMyAccusationInfo from '@app/graphql/hooks/accusation/useMyAccusationInfo';
import useNotificationListener from '@app/hooks/useNotificationListener';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import styled from 'styled-components/native';
import RoomItem from '@app/components/room/RoomItem';
import Skeleton from '@app/components/common/Skeleton';
import CreateInviteButton from '@app/components/room/CreateInviteButton';
import InviteItem from '@app/components/invite/InviteItem';
import Divider from '@app/components/common/Divider';

import {MY_ROOM_BASE} from '@app/graphql/fragments/room';
import {getFragmentData} from '@app/graphql/__generated__';

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
  UpdateInviteStatusSubscription,
  UpdateNewMessageInUserRoom,
} from '@app/graphql/__generated__/graphql';
import type {FragmentType} from '@app/graphql/__generated__';

interface HomeScreenProps
  extends StackScreenProps<MainNavigatorParamList, MainNavigatorScreens.Home> {}

const HomeScreen = (props: HomeScreenProps) => {
  const insets = useSafeAreaInsets();
  const showModal = useModal();

  const {rooms, fetchMore, refetch, hasNext, loading, networkStatus} =
    useMyRooms();
  const {updateMyRoom, appendMyRoom, sortMyRooms} = useUpdateMyRooms();
  const {
    inviteRooms,
    refetch: inviteRefetch,
    networkStatus: inviteNetStatus,
  } = useMyInvites();
  const {updateMyInviteStatus} = useUpdateMyInvites();
  const {data: myAccusationInfoData} = useMyAccusationInfo();

  const [simpleButton, setSimpleButton] = useState(false);

  const onScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    setSimpleButton(e.nativeEvent.contentOffset.y > 150);
  };

  const onRefreshFn = () => {
    refetch();
    inviteRefetch();
  };

  const updateNewMessage = (data?: UpdateNewMessageInUserRoom) => {
    if (!data) return;
    const {id, newMessage, lastMessage} = data;
    updateMyRoom(id, {newMessage, lastMessage}, {updatedAt: new Date()});
    sortMyRooms();
  };

  const updateNewRoom = (data?: FragmentType<typeof MY_ROOM_BASE>) => {
    if (!data) return;
    const room = getFragmentData(MY_ROOM_BASE, data);
    appendMyRoom(room);
    sortMyRooms();
  };

  const updateInviteStatus = (
    data?: UpdateInviteStatusSubscription['updateInviteStatus'],
  ) => {
    if (!data) return;
    const {roomId, id, status} = data;
    updateMyInviteStatus(roomId, id, status);
  };

  useNotificationListener();
  useNewRoomListener({
    onData: ({data}) => updateNewRoom(data.data?.newRoom),
  });
  useUpdateNewMessageListener({
    onData: ({data}) => updateNewMessage(data.data?.updateNewMessageInUserRoom),
  });
  useUpdateInviteStatusListener({
    onData: ({data}) => updateInviteStatus(data.data?.updateInviteStatus),
  });

  useEffect(() => {
    if (myAccusationInfoData?.myAccusationInfo.message) {
      showModal({
        title: '신고 내역이 있습니다',
        message: myAccusationInfoData.myAccusationInfo.message,
        buttons: [{text: '확인'}],
      });
    }
  }, [myAccusationInfoData]);

  if (loading) return <Container />;
  return (
    <Container>
      {(rooms.length > 0 || inviteRooms.length > 0) && (
        <FixedButton>
          <CreateInviteButton simple={simpleButton} />
        </FixedButton>
      )}
      <List
        onScroll={onScroll}
        data={rooms}
        renderItem={({item}) => <RoomItem userRoom={item} />}
        keyExtractor={item => item.id}
        ListHeaderComponent={
          <>
            {inviteRooms.length > 0 && (
              <>
                <SectionTitle>초대 목록</SectionTitle>
                <InviteList>
                  {inviteRooms.map((room, i) => (
                    <ItemBg key={`invite-room-${room.id}`} odd={i % 2 === 0}>
                      <InviteItem inviteRoom={room} />
                    </ItemBg>
                  ))}
                </InviteList>
              </>
            )}
            {inviteRooms.length > 0 && rooms.length > 0 && <Divider />}
            {rooms.length > 0 && <SectionTitle>내 채팅방</SectionTitle>}
          </>
        }
        ListFooterComponent={
          <>
            {rooms.length === 0 && inviteRooms.length === 0 && (
              <EmptyBox>
                <CreateInviteButton simple size={50} />
                <EmptyText>{`위의 버튼을 눌러\n랜덤으로 선정된 유저를\n채팅방에 초대하여\n대화를 시작해보세요!`}</EmptyText>
              </EmptyBox>
            )}
            {hasNext && (
              <SkeletonContainer>
                <Skeleton height={60} borderRadius={10} />
              </SkeletonContainer>
            )}
            <Footer bottom={insets.bottom} />
          </>
        }
        onEndReached={fetchMore}
        onEndReachedThreshold={0.5}
        refreshing={networkStatus === 4 || inviteNetStatus === 4}
        onRefresh={onRefreshFn}
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

interface FooterProps {
  bottom: number;
}

const Footer = styled.View<FooterProps>`
  height: ${({bottom}) => bottom + 40}px;
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
  bottom: 20px;
  right: 20px;
  z-index: 1;
`;

const SectionTitle = styled.Text`
  margin-top: 20px;
  margin-left: 25px;

  font-size: 12px;
  color: ${({theme}) => theme.gray100.default};
`;

const InviteList = styled.View`
  margin-top: 10px;
`;

interface ItemBgProps {
  odd: boolean;
}

const ItemBg = styled.View<ItemBgProps>`
  background-color: ${({odd, theme}) =>
    odd ? theme.gray700.default : theme.bgColor};
`;

export default HomeScreen;
