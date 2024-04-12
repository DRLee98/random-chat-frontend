import {useEffect, useState} from 'react';
import useLogout from '@app/hooks/useLogout';
import useMeDetail, {
  useUpdateMeDetail,
} from '@app/graphql/hooks/user/useMeDetail';
import useUpdateUser from '@app/graphql/hooks/user/useUpdateUser';

import styled from 'styled-components/native';

import {Switch} from 'react-native-gesture-handler';

import {AppState} from 'react-native';
import {AlertFn, openAppSettings} from '@app/utils/app';
import {messagingEnabled} from '@app/utils/fcm';

import {MainNavigatorScreens} from '@app/navigators';

import type {StackScreenProps} from '@react-navigation/stack';
import type {MainNavigatorParamList} from '@app/navigators';

interface SettingsScreenProps
  extends StackScreenProps<
    MainNavigatorParamList,
    MainNavigatorScreens.Settings
  > {}

const SettingsScreen = ({navigation}: SettingsScreenProps) => {
  const logout = useLogout();

  const {me} = useMeDetail();
  const updateMeDetail = useUpdateMeDetail();
  const [updateUser] = useUpdateUser();

  const [notiEnabled, setNotiEnabled] = useState(false);

  const goBlockUsersScreen = () => {
    navigation.navigate(MainNavigatorScreens.BlockUsers);
  };

  const setNotiInitState = async () => {
    const enabled = await messagingEnabled();
    const userNoti = me?.noti;
    setNotiEnabled(Boolean(enabled && userNoti));
  };

  const onChangeNotification = async (value: boolean) => {
    const enabled = await messagingEnabled();
    if (!enabled) {
      return AlertFn({
        title: '알림 설정',
        message: '알림을 받기 위해선 알림 권한이 필요합니다.',
        confirmText: '설정으로 이동',
        onConfirm: openAppSettings,
      });
    }
    setNotiEnabled(value);
    updateMeDetail({noti: value});
    const {data} = await updateUser({
      variables: {
        input: {
          noti: value,
        },
      },
    });
    if (!data?.updateUser.ok) {
      updateMeDetail({noti: !value});
    }
  };

  const onChangeAllowMessage = async (value: boolean) => {
    updateMeDetail({allowMessage: value});
    const {data} = await updateUser({
      variables: {
        input: {
          allowMessage: value,
        },
      },
    });
    if (!data?.updateUser.ok) {
      updateMeDetail({allowMessage: !value});
    }
  };

  const onLogout = () => {
    AlertFn({
      title: '로그아웃',
      message: '로그아웃 하시겠어요?',
      onConfirm: logout,
    });
  };

  useEffect(() => {
    setNotiInitState();
    const unsubscribe = AppState.addEventListener('change', setNotiInitState);
    return () => {
      unsubscribe.remove();
    };
  }, []);

  return (
    <Container>
      <ListItem>
        <ListText>알림 설정</ListText>
        <Switch value={notiEnabled} onValueChange={onChangeNotification} />
      </ListItem>
      <ListItem>
        <ListText>초대 허용</ListText>
        <Switch value={me?.allowMessage} onValueChange={onChangeAllowMessage} />
      </ListItem>
      <ListItem>
        <Button onPress={goBlockUsersScreen}>
          <ListText>차단유저 관리</ListText>
        </Button>
      </ListItem>
      <ListItem>
        <Button onPress={onLogout}>
          <ListText>로그아웃</ListText>
        </Button>
      </ListItem>
      <ListItem>
        <Button>
          <ListText>회원 탈퇴</ListText>
        </Button>
      </ListItem>
    </Container>
  );
};

const Container = styled.View`
  flex: 1;

  padding: 0 20px;

  background-color: ${({theme}) => theme.bgColor};
`;

const ListItem = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  height: 60px;

  padding: 0 5px;

  border-bottom-width: 1px;
  border-bottom-style: solid;
  border-bottom-color: ${({theme}) => theme.gray300.default};
`;

const ListText = styled.Text`
  font-size: 16px;
  color: ${({theme}) => theme.fontColor};
`;

const Button = styled.TouchableOpacity`
  flex: 1;
`;

export default SettingsScreen;
