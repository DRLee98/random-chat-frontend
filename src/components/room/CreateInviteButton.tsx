import {useState} from 'react';
import useInviteTargets from '@app/graphql/hooks/invite/useInviteTargets';
import useCreateInvite from '@app/graphql/hooks/invite/useCreateInvite';
import {useUpdateMyInvites} from '@app/graphql/hooks/invite/useMyInvites';
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

  const [inviteTargets, targetsData] = useInviteTargets();
  const [createInvite, createData] = useCreateInvite();
  const {appendMyInvite} = useUpdateMyInvites();

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

  const onPressCreateButton = async () => {
    await inviteTargets({variables: {input: {count: 3}}});
    setShowInviteModal(true);
  };

  const onCloseModal = () => {
    setShowInviteModal(false);
    setSelectUserId(undefined);
  };

  const onPressUserRow = (userId: string) => {
    setSelectUserId(userId);
  };

  const onPressCreateInvite = async () => {
    if (!selectUserId) return;
    const {data} = await createInvite({
      variables: {input: {targetIds: [selectUserId]}},
    });
    if (data?.createInvite.room) {
      appendMyInvite(data.createInvite.room);
      onCloseModal();
    }
  };

  return (
    <>
      <Modal visible={showInviteModal} transparent>
        <ModalOverlay activeOpacity={1} onPress={onCloseModal}>
          <ModalContainer activeOpacity={1}>
            <ModalUserListTitle>추천 유저</ModalUserListTitle>
            <ModalUserList>
              {targetsData.data?.inviteTargets.targets?.map(target => (
                <ModalUserRow
                  key={`target-user-${target.id}`}
                  onPress={() => onPressUserRow(target.id)}>
                  <UserRow
                    id={target.id}
                    nickname={target.nickname}
                    bio={target.bio}
                    profileUrl={target.profileUrl}
                    profileBgColor={target.profileBgColor}
                    profileTextColor={target.profileTextColor}
                    blockButton={false}
                    push={false}
                  />
                  {selectUserId === target.id && <ModalSelectUser />}
                </ModalUserRow>
              ))}
            </ModalUserList>
            <ModalButton
              onPress={onPressCreateInvite}
              disabled={!Boolean(selectUserId) || createData.loading}>
              {createData.loading && <Loader color="#fff" size={18} />}
              <ModalButtonText>채팅 초대하기</ModalButtonText>
            </ModalButton>
          </ModalContainer>
        </ModalOverlay>
      </Modal>
      <Button onPress={onPressCreateButton}>
        {targetsData.loading ? (
          <Loader color="#fff" size={size ?? 25} />
        ) : (
          <Icon color="#fff" name="dice" size={size ?? 25} />
        )}
        <AnimatedBox style={style}>
          <Text onLayout={onLayout} numberOfLines={1} ellipsizeMode="clip">
            채팅 초대
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
  color: ${({theme}) => theme.gray100.default};
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
  gap: 10px;

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
