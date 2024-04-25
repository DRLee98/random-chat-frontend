import {useEffect, useState} from 'react';
import useLogout from '@app/hooks/useLogout';
import useMeDetail, {
  useUpdateMeDetail,
} from '@app/graphql/hooks/user/useMeDetail';
import useUpdateUser from '@app/graphql/hooks/user/useUpdateUser';
import useDeleteUser from '@app/graphql/hooks/user/useDeleteUser';

import styled from 'styled-components/native';

import ProfileImg from '@app/components/user/ProfileImg';
import SocialPlatformLogo from '@app/components/common/SocialPlatformLogo';
import Switch from '@app/components/common/Switch';
import Divider from '@app/components/common/Divider';

import {AppState} from 'react-native';
import {AlertFn, openAppSettings} from '@app/utils/app';
import {messagingEnabled} from '@app/utils/fcm';

import {SettingsNavigatorScreens} from '@app/navigators/settings';

import type {StackScreenProps} from '@react-navigation/stack';
import type {SettingsNavigatorParamList} from '@app/navigators/settings';

interface SettingsScreenProps
  extends StackScreenProps<
    SettingsNavigatorParamList,
    SettingsNavigatorScreens.Settings
  > {}

const SettingsScreen = ({navigation}: SettingsScreenProps) => {
  const logout = useLogout();

  const {me} = useMeDetail();
  const updateMeDetail = useUpdateMeDetail();
  const [updateUser] = useUpdateUser();
  const [deleteUser] = useDeleteUser();

  const [notiEnabled, setNotiEnabled] = useState(false);

  const setNotiInitState = async () => {
    const enabled = await messagingEnabled();
    const userNoti = me?.noti;
    setNotiEnabled(Boolean(enabled && userNoti));
  };

  const deleteUserFn = async () => {
    const {data} = await deleteUser();
    if (data?.deleteUser.ok) {
      logout();
    }
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

  const onDeleteUser = () => {
    AlertFn({
      title: '회원탈퇴',
      message: '정말 탈퇴하시겠습니까?',
      onConfirm: deleteUserFn,
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
      {me && (
        <MyProfile>
          <ProfileImg id={me.id} url={me?.profileUrl} size={80} push />
          <MyProfileInfo>
            <NicknameBox>
              <Nickname ellipsizeMode="tail" numberOfLines={1}>
                {me.nickname}
              </Nickname>
              <SocialPlatformLogo socialPlatform={me.socialPlatform} />
            </NicknameBox>
            <Bio ellipsizeMode="tail" numberOfLines={1}>
              {me.bio}
            </Bio>
          </MyProfileInfo>
        </MyProfile>
      )}
      <Bundle>
        <ListItem>
          <ListText>알림 설정</ListText>
          <Switch value={notiEnabled} onValueChange={onChangeNotification} />
        </ListItem>
        <Divider />
        <ListItem>
          <ListText>초대 허용</ListText>
          <Switch
            value={me?.allowMessage}
            onValueChange={onChangeAllowMessage}
          />
        </ListItem>
        <Divider />
        <ListItem>
          <Button
            onPress={() =>
              navigation.navigate(SettingsNavigatorScreens.BlockUsers)
            }>
            <ListText>차단유저 관리</ListText>
          </Button>
        </ListItem>
      </Bundle>

      <Bundle>
        <ListItem>
          <Button
            onPress={() =>
              navigation.navigate(SettingsNavigatorScreens.Notice)
            }>
            <ListText>공지사항</ListText>
          </Button>
        </ListItem>
        <Divider />
        <ListItem>
          <Button
            onPress={() =>
              navigation.navigate(SettingsNavigatorScreens.Opinion)
            }>
            <ListText>의견 보내기</ListText>
          </Button>
        </ListItem>
        <Divider />
        <ListItem>
          <Button
            onPress={() =>
              navigation.navigate(SettingsNavigatorScreens.MyOpinions)
            }>
            <ListText>내가 작성한 의견</ListText>
          </Button>
        </ListItem>
      </Bundle>

      <Bundle>
        <ListItem>
          <Button onPress={onLogout}>
            <RedListText>로그아웃</RedListText>
          </Button>
        </ListItem>
        <Divider />
        <ListItem>
          <Button onPress={onDeleteUser}>
            <RedListText>회원 탈퇴</RedListText>
          </Button>
        </ListItem>
      </Bundle>
    </Container>
  );
};

const Container = styled.ScrollView`
  flex: 1;

  padding: 0 20px;

  background-color: ${({theme}) => theme.gray600.default};
`;

const MyProfile = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 20px;

  margin: 20px 0;
  padding: 10px;
  background-color: ${({theme}) => theme.bgColor};
  border-radius: 15px;
`;

const MyProfileInfo = styled.View`
  gap: 8px;
`;

const NicknameBox = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 6px;
`;

const Nickname = styled.Text`
  font-size: 14px;
  font-weight: 600;
  color: ${({theme}) => theme.fontColor};
`;

const Bio = styled.Text`
  font-size: 12px;
  color: ${({theme}) => theme.gray100.default};
`;

const Bundle = styled.View`
  margin-bottom: 20px;
  padding: 0 10px;

  background-color: ${({theme}) => theme.bgColor};
  border-radius: 15px;
`;

const ListItem = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  height: 60px;

  padding: 0 10px;
`;

const ListText = styled.Text`
  font-size: 15px;
  color: ${({theme}) => theme.fontColor};
`;

const RedListText = styled.Text`
  font-size: 15px;
  color: ${({theme}) => theme.red.default};
`;

const Button = styled.TouchableOpacity`
  flex: 1;
`;

export default SettingsScreen;
