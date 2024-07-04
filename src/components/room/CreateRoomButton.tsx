import {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {useUpdateMyRooms} from '@app/graphql/hooks/room/useMyRooms';
import useCreateRandomRoom from '@app/graphql/hooks/room/useCreateRandomRoom';
import {useModal} from '@app/contexts/modalContext';
import {useAnimatedStyle} from 'react-native-reanimated';

import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/FontAwesome5';

import {Modal} from 'react-native';
import Loader from '../common/Loader';
import UserRow from '../user/UserRow';

import Animated, {withTiming} from 'react-native-reanimated';

import {getFragmentData} from '@app/graphql/__generated__';
import {MY_ROOM_BASE} from '@app/graphql/fragments/room';

import {MainNavigatorScreens} from '@app/navigators';

import type {NavigationProp} from '@react-navigation/native';
import type {MainNavigatorParamList} from '@app/navigators';
import type {MyRoomBaseFragment} from '@app/graphql/__generated__/graphql';
import type {LayoutChangeEvent, LayoutRectangle} from 'react-native';

interface CreateRoomButtonProps {
  simple?: boolean;
  size?: number;
}

const CreateRoomButton = ({simple, size}: CreateRoomButtonProps) => {
  const showModal = useModal();
  const navigation = useNavigation<NavigationProp<MainNavigatorParamList>>();

  const [createRandomRoom, {loading}] = useCreateRandomRoom();
  const {appendMyRoom, sortMyRooms} = useUpdateMyRooms();

  const [showInviteModal, setShowInviteModal] = useState(false);
  const [selectUserId, setSelectUserId] = useState<string>();

  const [layout, setLayout] = useState<LayoutRectangle>();

  const style = useAnimatedStyle(() =>
    layout
      ? {
          height: layout.height,
          width: withTiming(simple ? 0 : layout.width),
        }
      : {},
  );

  const onLayout = (e: LayoutChangeEvent) => {
    if (layout) return;
    setLayout(e.nativeEvent.layout);
  };

  const onPressCreateButton = () => {
    setShowInviteModal(true);
  };

  const onPressModalOverlay = () => {
    setShowInviteModal(false);
    setSelectUserId(undefined);
  };

  const onPressUserRow = (userId: string) => {
    setSelectUserId(userId);
  };

  const goChatRoom = (item: MyRoomBaseFragment) => {
    navigation.navigate(MainNavigatorScreens.ChatRoom, {
      chatRoomName: item.name ?? null,
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

  return (
    <>
      <Modal visible={showInviteModal} transparent>
        <ModalOverlay activeOpacity={1} onPress={onPressModalOverlay}>
          <ModalContainer activeOpacity={1}>
            <ModalUserListTitle>추천 유저</ModalUserListTitle>
            <ModalUserList>
              <ModalUserRow onPress={() => onPressUserRow('0')}>
                <UserRow
                  id={'0'}
                  nickname="test"
                  bio="test bio"
                  blockButton={false}
                  push={false}
                />
                {selectUserId === '0' && <ModalSelectUser />}
              </ModalUserRow>
              <ModalUserRow onPress={() => onPressUserRow('1')}>
                <UserRow
                  id={'1'}
                  nickname="test"
                  bio="test bio"
                  blockButton={false}
                  push={false}
                />
                {selectUserId === '1' && <ModalSelectUser />}
              </ModalUserRow>
              <ModalUserRow onPress={() => onPressUserRow('2')}>
                <UserRow
                  id={'2'}
                  nickname="test"
                  bio="test bio"
                  blockButton={false}
                  push={false}
                />
                {selectUserId === '2' && <ModalSelectUser />}
              </ModalUserRow>
            </ModalUserList>
            <ModalButton disabled={!Boolean(selectUserId)}>
              <ModalButtonText>채팅 초대하기</ModalButtonText>
            </ModalButton>
          </ModalContainer>
        </ModalOverlay>
      </Modal>
      <Button onPress={onPressCreateButton}>
        {loading ? (
          <Loader color="#fff" size={size ?? 25} />
        ) : (
          <Icon color="#fff" name="dice" size={size ?? 25} />
        )}
        <AnimatedBox style={style}>
          <Text onLayout={onLayout} numberOfLines={1} ellipsizeMode="clip">
            채팅 생성
          </Text>
        </AnimatedBox>
      </Button>
    </>
  );
};

const Button = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  justify-content: center;

  padding: 15px 20px;

  background-color: ${({theme}) => theme.primary.default};
  border-radius: 999px;
`;

const AnimatedBox = styled(Animated.View)`
  position: relative;

  justify-content: center;
  align-items: center;

  overflow: hidden;
`;

const Text = styled.Text`
  position: absolute;
  left: 0;

  padding-left: 10px;

  font-size: 16px;
  font-weight: bold;
  color: #fff;
`;

const ModalOverlay = styled.TouchableOpacity`
  flex: 1;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.5);
`;

const ModalContainer = styled.TouchableOpacity`
  width: 80%;

  padding: 20px;

  border-radius: 10px;
  background-color: ${({theme}) => theme.bgColor};
`;

const ModalUserListTitle = styled.Text`
  font-size: 12px;
`;

const ModalUserList = styled.View`
  margin: 10px 0;
`;

const ModalUserRow = styled.TouchableOpacity`
  position: relative;
  padding: 0 10px;
`;

const ModalSelectUser = styled.View`
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;

  border-radius: 5px;
  background-color: ${({theme}) => theme.green.default};

  opacity: 0.2;
`;

const ModalButton = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  justify-content: center;

  padding: 15px 20px;

  background-color: ${({theme, disabled}) =>
    disabled ? theme.gray400.default : theme.primary.default};
  border-radius: 10px;
`;

const ModalButtonText = styled.Text`
  font-size: 16px;
  font-weight: bold;
  color: #fff;
`;

export default CreateRoomButton;
