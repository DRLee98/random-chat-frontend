import useLogin from '@app/graphql/hooks/useLogin';

import {kakaoLogin} from '@app/apis/kakao';
import {naverLogin} from '@app/apis/naver';

import SocialLoginButton from '@app/components/login/SocialLoginButton';
import {View} from 'react-native';

import naverLogo from '@app/assets/images/naver_logo.png';
import kakaoLogo from '@app/assets/images/kakao_logo.png';

import {MainNavigatorScreens} from '@app/navigators';

import type {StackScreenProps} from '@react-navigation/stack';
import type {MainNavigatorParamList} from '@app/navigators';
import type {SignUpScreenParams} from '@app/screens/signUp';

interface LoginScreenProps
  extends StackScreenProps<
    MainNavigatorParamList,
    MainNavigatorScreens.Login
  > {}

const LoginScreen = ({navigation}: LoginScreenProps) => {
  const [login] = useLogin();

  const naverLoginFn = async () => {
    const profile = await naverLogin();

    if (!profile) return;
    loginFn({
      socialId: profile.id,
      socialPlatform: 'NAVER',
      nickname: profile.nickname + '',
      profileUrl: profile.profile_image ?? undefined,
    });
  };

  const kakaoLoginFn = async () => {
    const profile = await kakaoLogin();

    if (!profile) return;
    loginFn({
      socialId: profile.id + '',
      socialPlatform: 'KAKAO',
      nickname: profile.nickname,
      profileUrl: profile.profileImageUrl,
    });
  };

  const loginFn = async (input: SignUpScreenParams) => {
    const result = await login({
      variables: {
        input: {
          socialId: input.socialId,
          socialPlatform: input.socialPlatform,
        },
      },
    });
    if (result.data?.login.ok) {
    } else {
      navigation.navigate(MainNavigatorScreens.SignUp, input);
    }
  };

  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <SocialLoginButton
        image={naverLogo}
        text="네이버 로그인"
        textColor="#fff"
        bgColor="#02c759"
        onPress={naverLoginFn}
      />
      <View style={{height: 10}} />
      <SocialLoginButton
        image={kakaoLogo}
        text="카카오 로그인"
        textColor="#000000d9"
        bgColor="#ffeb01"
        onPress={kakaoLoginFn}
      />
    </View>
  );
};

export default LoginScreen;
