import useThemeMode from '@app/hooks/useThemeMode';
import useLoginAndSetToken from '@app/hooks/useLoginAndSetToken';

import {kakaoLogin} from '@app/apis/kakao';
import {naverLogin} from '@app/apis/naver';
import {appleLogin} from '@app/apis/apple';

import styled from 'styled-components/native';
import SocialLoginButton from '@app/components/login/SocialLoginButton';
import BubbleDiceIcon from '@app/components/common/BubbleDiceIcon';

import naverLogo from '@app/assets/images/naver_logo.png';
import kakaoLogo from '@app/assets/images/kakao_logo.png';
import appleBlackLogo from '@app/assets/images/apple_black.png';
import appleWhiteLogo from '@app/assets/images/apple_white.png';

import {Platform} from 'react-native';
import {MainNavigatorScreens} from '@app/navigators';

import {setSociald} from '@app/utils/encStorage';

import {SocialPlatform} from '@app/graphql/__generated__/graphql';

import type {StackScreenProps} from '@react-navigation/stack';
import type {MainNavigatorParamList} from '@app/navigators';
import type {SignUpScreenParams} from '@app/screens/signUp';

interface LoginScreenProps
  extends StackScreenProps<
    MainNavigatorParamList,
    MainNavigatorScreens.Login
  > {}

const LoginScreen = ({navigation}: LoginScreenProps) => {
  const theme = useThemeMode();
  const login = useLoginAndSetToken();

  const naverLoginFn = async () => {
    const profile = await naverLogin();
    if (!profile) return;
    loginFn({
      socialId: profile.id,
      socialPlatform: SocialPlatform.Naver,
      nickname: profile.nickname ?? '',
      profileUrl: profile.profile_image ?? undefined,
    });
  };

  const kakaoLoginFn = async () => {
    const profile = await kakaoLogin();
    if (!profile) return;
    loginFn({
      socialId: profile.id + '',
      socialPlatform: SocialPlatform.Kakao,
      nickname: profile.nickname,
      profileUrl: profile.profileImageUrl,
    });
  };

  const appleLoginFn = async () => {
    const profile = await appleLogin();
    if (!profile) return;
    loginFn({
      socialId: profile.user + '',
      socialPlatform: SocialPlatform.Apple,
      nickname: '',
    });
  };

  const loginFn = async (input: SignUpScreenParams) => {
    const result = await login({
      socialId: input.socialId,
      socialPlatform: input.socialPlatform,
    });
    if (result === 'success') {
      setSociald(input);
      navigation.reset({routes: [{name: MainNavigatorScreens.Home}]});
    } else if (result === 'fail') {
      navigation.navigate(MainNavigatorScreens.SignUp, input);
    }
  };

  return (
    <Container>
      <IconBox>
        <BubbleDiceIcon />
      </IconBox>
      <ButtonBox>
        <SocialLoginButton
          image={naverLogo}
          text="네이버 로그인"
          textColor="#fff"
          bgColor="#02c759"
          onPress={naverLoginFn}
        />
        <SocialLoginButton
          image={kakaoLogo}
          text="카카오 로그인"
          textColor="#000000d9"
          bgColor="#ffeb01"
          onPress={kakaoLoginFn}
        />
        {Platform.OS === 'ios' && (
          <SocialLoginButton
            image={theme === 'dark' ? appleWhiteLogo : appleBlackLogo}
            text="애플 로그인"
            textColor={theme === 'dark' ? '#000000' : '#FFFFFF'}
            bgColor={theme === 'dark' ? '#FFFFFF' : '#000000'}
            onPress={appleLoginFn}
          />
        )}
      </ButtonBox>
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
  align-items: center;
  background-color: ${({theme}) => theme.bgColor};
`;

const IconBox = styled.View`
  flex: 3;
  align-items: center;
  justify-content: center;
`;

const ButtonBox = styled.View`
  flex: 2;
  gap: 15px;
`;

export default LoginScreen;
