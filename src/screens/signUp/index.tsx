import {useEffect, useState} from 'react';
import useLoginAndSetToken from '@app/hooks/useLoginAndSetToken';
import useCreateUser from '@app/graphql/hooks/useCreateUser';
import useRandomNickname from '@app/graphql/hooks/useRandomNickname';

import {Button, TextInput, View} from 'react-native';
import ProfileImg from '@app/components/common/ProfileImg';
import PictureSelectButton from '@app/components/common/PictureSelectButton';

import {ReactNativeFile} from 'apollo-upload-client';
import {ApolloError} from '@apollo/client';

import {MainNavigatorScreens} from '@app/navigators';

import {setSociald} from '@app/utils/encStorage';

import type {StackScreenProps} from '@react-navigation/stack';
import type {MainNavigatorParamList} from '@app/navigators';
import type {CreateUserInput} from '@app/graphql/types/graphql';
import type {Asset} from 'react-native-image-picker';

export interface SignUpScreenParams extends Omit<CreateUserInput, 'profile'> {
  profileUrl?: string;
}

interface Profile {
  uri: string;
  file: ReactNativeFile;
}

interface Values extends Omit<CreateUserInput, 'profile'> {}

interface SignUpScreenProps
  extends StackScreenProps<
    MainNavigatorParamList,
    MainNavigatorScreens.SignUp
  > {}

const SignUpScreen = ({route, navigation}: SignUpScreenProps) => {
  const login = useLoginAndSetToken();
  const [createUser] = useCreateUser();
  const [randomNickname, randomNicknameResult] = useRandomNickname();

  const [profile, setProfile] = useState<Profile>();
  const [values, setValues] = useState<Values>();

  const setImage = (asset: Asset) => {
    if (asset.uri && asset.type) {
      const file = new ReactNativeFile({
        uri: asset.uri,
        name: asset.fileName,
        type: asset.type,
      });
      const uriPath = asset.uri.split('//').pop();
      setProfile({uri: 'file://' + uriPath, file});
    }
  };

  const setValuesFn = async (params: SignUpScreenParams) => {
    const {profileUrl, ...v} = params;
    if (profileUrl) {
      const file = new ReactNativeFile({
        uri: params.profileUrl,
        name: `${params.socialPlatform}_profile.${profileUrl.split('.').pop()}`,
        type: 'image',
      });
      setProfile({uri: profileUrl, file});
    }
    setValues(v);
  };

  const createRandomNickname = async () => {
    const result = await randomNickname();
    console.log('randomNickname', result?.randomNickname);
    if (result?.randomNickname.ok) {
      setValues(
        prev =>
          prev && {
            ...prev,
            nickname: result?.randomNickname.nickname ?? prev.nickname,
          },
      );
    }
  };

  const regist = async () => {
    try {
      if (values) {
        const result = await createUser({
          variables: {
            input: {...values, ...(profile && {profile: profile.file})},
          },
        });
        console.log('createUser', result.data?.createUser.ok, values, profile);
        if (result.data?.createUser.ok) {
          const socialData = {
            socialId: values.socialId,
            socialPlatform: values.socialPlatform,
          };
          const loginResult = await login(socialData);
          if (loginResult) {
            setSociald(socialData);
            navigation.replace(MainNavigatorScreens.Home);
          } else {
            console.error('login failed');
          }
        }
      }
    } catch (error) {
      if (error instanceof ApolloError) {
        error.graphQLErrors.forEach(e => {
          console.error('error', e.message);
        });
      } else {
        console.error('error', error);
      }
    }
  };

  useEffect(() => {
    setValuesFn(route.params);
  }, [route.params]);

  return (
    <View style={{alignItems: 'center', justifyContent: 'center', flex: 1}}>
      <PictureSelectButton onChange={setImage}>
        <ProfileImg url={profile?.uri} />
      </PictureSelectButton>
      <View style={{flexDirection: 'row', marginVertical: 20}}>
        <TextInput placeholder="nickname" value={values?.nickname} />
        <Button
          disabled={randomNicknameResult.loading}
          title="랜덤 닉네임 생성"
          onPress={createRandomNickname}
        />
      </View>
      <Button title="가입하기" onPress={regist} />
    </View>
  );
};

export default SignUpScreen;
