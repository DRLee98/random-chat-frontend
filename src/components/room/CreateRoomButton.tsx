import {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {useUpdateMyRooms} from '@app/graphql/hooks/room/useMyRooms';
import useCreateRandomRoom from '@app/graphql/hooks/room/useCreateRandomRoom';
import {useModal} from '@app/contexts/modalContext';
import {useAnimatedStyle} from 'react-native-reanimated';

import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Loader from '../common/Loader';

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

  return (
    <Button onPress={createRandomRoomFn}>
      {loading ? (
        <Loader size={size ?? 25} />
      ) : (
        <StyledIcon name="dice" size={size ?? 25} />
      )}
      <AnimatedBox style={style}>
        <Text onLayout={onLayout} numberOfLines={1} ellipsizeMode="clip">
          채팅 생성
        </Text>
      </AnimatedBox>
    </Button>
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

const StyledIcon = styled(Icon)`
  color: ${({theme}) => theme.bgColor};
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
  color: ${({theme}) => theme.bgColor};
`;

export default CreateRoomButton;
