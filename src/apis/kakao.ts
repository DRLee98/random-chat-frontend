import {getProfile, login} from '@react-native-seoul/kakao-login';

export const kakaoLogin = async () => {
  const {accessToken} = await login();

  if (!accessToken) return null;

  return getKakaoProfile();
};

export const getKakaoProfile = async () => {
  const profile = await getProfile();

  return profile;
};
