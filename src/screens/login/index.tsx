import {login} from '@react-native-seoul/kakao-login';
import NaverLogin from '@react-native-seoul/naver-login';

import {Text, TouchableOpacity, View} from 'react-native';

import Config from 'react-native-config';

const LoginScreen = () => {
  const naverLogin = async () => {
    const {failureResponse, successResponse} = await NaverLogin.login({
      appName: Config.NAVER_APP_NAME,
      consumerKey: Config.NAVER_CLIENT_ID,
      consumerSecret: Config.NAVER_CLIENT_SECRET,
      serviceUrlScheme: Config.NAVER_SERVICE_URL_SCHEME,
    });

    console.log('successResponse', successResponse);
    console.log('failureResponse', failureResponse);
  };

  const kakaoLogin = async (): Promise<void> => {
    const res = await login();

    console.log('res', res);
  };

  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <TouchableOpacity onPress={kakaoLogin}>
        <Text>kakao login</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={naverLogin}>
        <Text>naver login</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginScreen;
