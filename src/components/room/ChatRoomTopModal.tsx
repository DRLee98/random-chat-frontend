import {useNavigation} from '@react-navigation/native';
import {useEffect, useLayoutEffect, useState} from 'react';
import {useTheme} from 'styled-components/native';
import useExitRoom from '@app/hooks/useExitRoom';

import styled from 'styled-components/native';

import TopModal from '@app/components/common/TopModal';
import Icon from 'react-native-vector-icons/FontAwesome';
import NotiButton from '@app/components/room/NotiButton';
import PinnedButton from '@app/components/room/PinnedButton';
import ExitButton from '@app/components/room/ExitButton';
import ProfileImg from '@app/components/user/ProfileImg';

import {getChatRoomName} from '@app/utils/name';

import {MainNavigatorScreens} from '@app/navigators';

import type {MainNavigatorParamList} from '@app/navigators';
import type {NavigationProp} from '@react-navigation/native';
import type {
  MeQuery,
  RoomDetailQuery,
} from '@app/graphql/__generated__/graphql';
import ToggleUserBlockButton from '../user/ToggleUserBlockButton';

interface ChatRoomTopModalProps {
  roomId: string;
  roomDetail: RoomDetailQuery['roomDetail']['room'];
  me?: MeQuery['me']['me'];
}

const ChatRoomTopModal = ({roomId, roomDetail, me}: ChatRoomTopModalProps) => {
  const theme = useTheme();
  const navigation = useNavigation<NavigationProp<MainNavigatorParamList>>();

  const exitRoom = useExitRoom();

  const [modalVisible, setModalVisible] = useState(false);

  const openModal = () => setModalVisible(true);
  const closeModal = () => setModalVisible(false);

  const onEditPress = () => {
    if (!roomDetail) return;
    navigation.navigate(MainNavigatorScreens.ChatRoomEdit, {
      roomId,
      userRoomId: roomDetail.userRoom.id,
      userRoomName: getChatRoomName(roomDetail),
    });
  };

  const onUserPress = (userId?: string) => {
    if (!userId) {
      navigation.navigate(MainNavigatorScreens.Me);
      return;
    }
    navigation.navigate(MainNavigatorScreens.User, {userId});
  };

  const deleteRoomAfterFn = async () => {
    navigation.reset({routes: [{name: MainNavigatorScreens.Home}]});
  };

  const onAfterBlockFn = () => {
    exitRoom(roomId, deleteRoomAfterFn);
  };

  useEffect(() => {
    if (modalVisible) {
      navigation.setOptions({
        headerRight: () => null,
        headerTitle: () => (
          <RoomNameBox>
            <RoomName>{getChatRoomName(roomDetail)}</RoomName>
            <EditButton onPress={onEditPress}>
              <Icon name="pencil" size={18} color={theme.fontColor} />
            </EditButton>
          </RoomNameBox>
        ),
      });
    } else {
      navigation.setOptions({
        headerRight: () => (
          <ModalButton onPress={openModal}>
            <Icon name="bars" size={18} color={theme.fontColor} />
          </ModalButton>
        ),
        headerTitle: getChatRoomName(roomDetail),
      });
    }
  }, [modalVisible]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <ModalButton onPress={openModal}>
          <Icon name="bars" size={18} color={theme.fontColor} />
        </ModalButton>
      ),
    });
  }, []);

  if (!roomDetail) return null;
  return (
    <TopModal visible={modalVisible} onCloseModal={closeModal}>
      <Containder>
        <UserBox>
          {me && (
            <UserList onPress={() => onUserPress()}>
              <UserInfo>
                <ProfileBox>
                  <ProfileImg
                    id={me.id}
                    url={me.profileUrl}
                    bgColor={me.profileBgColor}
                    textColor={me.profileTextColor}
                    size={40}
                  />
                  <MeBox>
                    <Me>나</Me>
                  </MeBox>
                </ProfileBox>
                <UserName>{me.nickname}</UserName>
              </UserInfo>
            </UserList>
          )}
          {roomDetail.users.map(user => (
            <UserList
              key={`user-${user.id}`}
              onPress={() => onUserPress(user.id)}>
              <UserInfo>
                <ProfileImg
                  id={user.id}
                  url={user.profileUrl}
                  bgColor={user.profileBgColor}
                  textColor={user.profileTextColor}
                  size={40}
                />
                <UserName>{user.nickname}</UserName>
              </UserInfo>
              <ToggleUserBlockButton
                userId={user.id}
                nickname={user.nickname}
                onAfterBlock={onAfterBlockFn}
              />
            </UserList>
          ))}
        </UserBox>
        <ButtonBox>
          <SpaceBetween>
            <ButtonList>
              <NotiButton
                roomId={roomId}
                userRoomId={roomDetail.userRoom.id}
                noti={roomDetail.userRoom.noti}
                color={theme.fontColor}
                size={25}
              />
              <PinnedButton
                roomId={roomId}
                userRoomId={roomDetail.userRoom.id}
                pinned={Boolean(roomDetail.userRoom.pinnedAt)}
                color={theme.fontColor}
                size={25}
              />
            </ButtonList>
            <ExitButton
              roomId={roomId}
              roomName={getChatRoomName(roomDetail)}
              type="icon"
              onAfterDelete={deleteRoomAfterFn}
              color={theme.fontColor}
              size={25}
            />
          </SpaceBetween>
        </ButtonBox>
      </Containder>
    </TopModal>
  );
};

const ModalButton = styled.TouchableOpacity``;

const Containder = styled.View`
  gap: 12px;
`;

const RoomNameBox = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 15px;
`;

const RoomName = styled.Text`
  font-size: 16px;
  font-weight: 400;
  color: ${({theme}) => theme.fontColor};
`;

const EditButton = styled.TouchableOpacity``;

const UserBox = styled.View`
  padding: 0 20px;
`;

const ProfileBox = styled.View`
  position: relative;
`;

const MeBox = styled.View`
  position: absolute;
  top: 0px;
  right: 0px;

  padding: 2px;
  background-color: ${({theme}) => theme.red.default};
  border-radius: 4px;
`;

const Me = styled.Text`
  font-size: 10px;
  font-weight: 600;
  color: #fff;
`;

const UserList = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  margin: 10px 0;
`;

const UserInfo = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 10px;
`;

const UserName = styled.Text`
  font-size: 12px;
  color: ${({theme}) => theme.fontColor};
`;

const SpaceBetween = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const ButtonBox = styled.View`
  padding: 0 25px;
  padding-top: 15px;

  border-top-width: 1px;
  border-style: solid;
  border-color: ${({theme}) => theme.gray500.default};
`;

const ButtonList = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 20px;
`;

export default ChatRoomTopModal;
