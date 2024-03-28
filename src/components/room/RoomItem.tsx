import {useNavigation} from '@react-navigation/native';

import styled, {useTheme} from 'styled-components/native';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import SwipeableListItem from '@app/components/common/SwipeableListItem';
import ProfileImg from '@app/components/common/ProfileImg';
import PinnedButton from '@app/components/room/PinnedButton';
import NotiButton from '@app/components/room/NotiButton';
import ExitButton from '@app/components/room/ExitButton';

import {getTimestamp} from '@app/utils/functions';

import {MainNavigatorScreens} from '@app/navigators';

import type {NavigationProp} from '@react-navigation/native';
import type {MainNavigatorParamList} from '@app/navigators';
import type {MyRoom} from '@app/graphql/types/graphql';

interface RoomItemProps {
  userRoom: MyRoom;
}

const RoomItem = ({userRoom}: RoomItemProps) => {
  const theme = useTheme();
  const navigation = useNavigation<NavigationProp<MainNavigatorParamList>>();

  const goChatRoom = () => {
    navigation.navigate(MainNavigatorScreens.ChatRoom, {
      roomId: userRoom.room.id,
    });
  };

  return (
    <SwipeableListItem
      leftActions={
        <ButtonList>
          <ButtonBox color={theme.orange.default}>
            <PinnedButton
              roomId={userRoom.room.id}
              userRoomId={userRoom.id}
              pinned={Boolean(userRoom.pinnedAt)}
              color="#fff"
              size={24}
            />
          </ButtonBox>
          <ButtonBox color={theme.yellow.default}>
            <NotiButton
              roomId={userRoom.room.id}
              userRoomId={userRoom.id}
              noti={userRoom.noti}
              color="#fff"
              size={22}
            />
          </ButtonBox>
        </ButtonList>
      }
      rightActions={
        <ButtonBox color={theme.red.default}>
          <ExitButton
            roomId={userRoom.room.id}
            type="text"
            color="#fff"
            size={16}
          />
        </ButtonBox>
      }>
      <Container onPress={goChatRoom} activeOpacity={1}>
        <ProfileImg
          id={userRoom.users[0].id}
          url={userRoom.users[0].profileUrl}
          size={50}
        />
        <ContentsBox>
          <SpaceBetween>
            <TitleBox>
              <Title>{userRoom.name}</Title>
              {userRoom.pinnedAt && (
                <Icon color={theme.gray200.default} size={14} name="pin" />
              )}
              {!userRoom.noti && (
                <Icon
                  color={theme.gray200.default}
                  size={14}
                  name="bell-cancel-outline"
                />
              )}
            </TitleBox>
            <DateText>{getTimestamp(userRoom.room.updatedAt)}</DateText>
          </SpaceBetween>
          <SpaceBetween>
            <LastMessage>{userRoom.lastMessage}</LastMessage>
            {userRoom.newMessage > 0 && (
              <NewMessage>
                <NewMessageText>{userRoom.newMessage}</NewMessageText>
              </NewMessage>
            )}
          </SpaceBetween>
        </ContentsBox>
      </Container>
    </SwipeableListItem>
  );
};

const Container = styled.TouchableOpacity`
  flex-direction: row;
  gap: 10px;
  padding: 10px 20px;
  background-color: ${({theme}) => theme.bgColor};
`;

const SpaceBetween = styled.View`
  flex-direction: row;
  align-items: stretch;
  justify-content: space-between;
`;

const NewMessage = styled.View`
  align-items: center;
  justify-content: center;
  padding: 2px 6px;
  background-color: ${({theme}) => theme.red.accessible};
  border-radius: 10px;
`;

const NewMessageText = styled.Text`
  color: #fff;
  font-weight: 600;
`;

const ButtonList = styled.View`
  flex-direction: row;
`;

interface ButtonBoxProps {
  color: string;
}

const ButtonBox = styled.View<ButtonBoxProps>`
  align-items: center;
  justify-content: center;
  height: 100%;
  aspect-ratio: 1;
  background-color: ${({color}) => color};
`;

const ContentsBox = styled.View`
  flex: 1;
  align-items: stretch;
  justify-content: center;
  gap: 8px;
`;

const TitleBox = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 4px;
`;

const Title = styled.Text`
  font-weight: 500;
  font-size: 14px;
  color: ${({theme}) => theme.fontColor};
`;

const DateText = styled.Text`
  font-size: 12px;
  color: ${({theme}) => theme.gray100.default};
`;

const LastMessage = styled.Text`
  font-size: 13px;
  color: ${({theme}) => theme.gray200.default};
`;

export default RoomItem;
