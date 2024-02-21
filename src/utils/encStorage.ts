import {LoginInput} from '@app/graphql/types/graphql';
import EncryptedStorage from 'react-native-encrypted-storage';

interface SetSocialIdProps extends LoginInput {}

export const setSociald = async ({
  socialId,
  socialPlatform,
}: SetSocialIdProps) => {
  try {
    await EncryptedStorage.setItem('socialId', socialId);
    await EncryptedStorage.setItem('socialPlatform', socialPlatform);
  } catch (error) {
    console.error(error);
  }
};

export const setToken = async (token: string) => {
  await EncryptedStorage.setItem('token', token);
};

export const getToken = async () => {
  return await EncryptedStorage.getItem('token');
};
