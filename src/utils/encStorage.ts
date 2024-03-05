import {LoginInput} from '@app/graphql/types/graphql';
import EncryptedStorage from 'react-native-encrypted-storage';

interface SetSocialIdProps extends LoginInput {}

export const setSociald = async ({
  socialId,
  socialPlatform,
}: SetSocialIdProps) => {
  await EncryptedStorage.setItem('socialId', socialId);
  await EncryptedStorage.setItem('socialPlatform', socialPlatform);
};

export const getSociald = async () => {
  const socialId = await EncryptedStorage.getItem('socialId');
  const socialPlatform = await EncryptedStorage.getItem('socialPlatform');
  if (!socialId || !socialPlatform) return null;
  return {socialId, socialPlatform};
};

export const removeSociald = async () => {
  await EncryptedStorage.removeItem('socialId');
  await EncryptedStorage.removeItem('socialPlatform');
};

export const setToken = async (token: string) => {
  await EncryptedStorage.setItem('token', token);
};

export const getToken = async () => {
  return await EncryptedStorage.getItem('token');
};

export const removeToken = async () => {
  await EncryptedStorage.removeItem('token');
};
