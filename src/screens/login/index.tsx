import {useEffect} from 'react';
import useLogin from '@app/graphql/hooks/useLogin';

import {kakaoLogin} from '@app/apis/kakao';
import {naverLogin} from '@app/apis/naver';

import SocialLoginButton from '@app/components/login/SocialLoginButton';
import {View} from 'react-native';

import naverLogo from '@app/assets/images/naver_logo.png';
import kakaoLogo from '@app/assets/images/kakao_logo.png';

import type {LoginInput} from '@app/graphql/types/graphql';

const LoginScreen = () => {
  const [login, loginResult] = useLogin();

  const loginFn = (input: LoginInput) => {
    login({
      variables: {
        input,
      },
    });
  };

  const naverLoginFn = async () => {
    const profile = await naverLogin();

    if (!profile) return;
    loginFn({
      socialId: profile.id,
      socialPlatform: 'NAVER',
    });
  };

  const kakaoLoginFn = async (): Promise<void> => {
    const profile = await kakaoLogin();

    if (!profile) return;
    loginFn({
      socialId: profile.id + '',
      socialPlatform: 'KAKAO',
    });
  };

  useEffect(() => {
    if (loginResult.variables && loginResult.data?.login) {
      if (loginResult.data.login.ok) {
        // 유저 세팅
      } else {
        // 회원가입 화면으로 이동
      }
    }
  }, [loginResult.data?.login]);

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
