import {kakaoLogin} from '@app/apis/kakao';
import {naverLogin} from '@app/apis/naver';

import SocialLoginButton from '@app/components/login/SocialLoginButton';
import {View} from 'react-native';

import naverLogo from '@app/assets/images/naver_logo.png';
import kakaoLogo from '@app/assets/images/kakao_logo.png';

const LoginScreen = () => {
  const naverLoginFn = async () => {
    const profile = await naverLogin();

    console.log('naver profile', profile);
  };

  const kakaoLoginFn = async (): Promise<void> => {
    const profile = await kakaoLogin();

    console.log('kakao profile', profile);
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
