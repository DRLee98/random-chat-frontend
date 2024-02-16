import NaverLogin from '@react-native-seoul/naver-login';
import Config from 'react-native-config';

export const naverLogin = async () => {
  const {successResponse} = await NaverLogin.login({
    appName: Config.NAVER_APP_NAME,
    consumerKey: Config.NAVER_CLIENT_ID,
    consumerSecret: Config.NAVER_CLIENT_SECRET,
    serviceUrlScheme: Config.NAVER_SERVICE_URL_SCHEME,
  });

  if (!successResponse) return null;

  return getNaverProfile(successResponse.accessToken);
};

export const getNaverProfile = async (token: string) => {
  const {response, resultcode} = await NaverLogin.getProfile(token);

  if (resultcode !== '00') return null;

  return response;
};
