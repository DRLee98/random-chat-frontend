import {useNavigation} from '@react-navigation/native';

import styled, {useTheme} from 'styled-components/native';

import {View, Text} from 'react-native';
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
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            gap: 8,
            alignItems: 'stretch',
          }}>
          <SpaceBetween>
            <View style={{flexDirection: 'row', alignItems: 'center', gap: 4}}>
              <Text style={{fontWeight: '700'}}>{userRoom.name}</Text>
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
            </View>
            <DateText>{getTimestamp(userRoom.room.updatedAt)}</DateText>
          </SpaceBetween>
          <SpaceBetween>
            <Text>{userRoom.lastMessage}</Text>
            {userRoom.newMessage > 0 && (
              <NewMessage>
                <NewMessageText>{userRoom.newMessage}</NewMessageText>
              </NewMessage>
            )}
          </SpaceBetween>
        </View>
      </Container>
    </SwipeableListItem>
  );
};

const Container = styled.TouchableOpacity`
  flex-direction: row;
  gap: 10px;
  padding: 10px 15px;
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

const DateText = styled.Text`
  font-size: 12px;
  color: ${({theme}) => theme.gray100.default};
`;

export default RoomItem;
