import {useEffect, useState} from 'react';
import useLoginAndSetToken from '@app/hooks/useLoginAndSetToken';
import useCreateUser from '@app/graphql/hooks/user/useCreateUser';
import useRandomNickname from '@app/graphql/hooks/user/useRandomNickname';

import {Button, TextInput, View} from 'react-native';
import ProfileImg from '@app/components/common/ProfileImg';
import PictureSelectButton from '@app/components/common/PictureSelectButton';

import {ApolloError} from '@apollo/client';

import {MainNavigatorScreens} from '@app/navigators';

import {setSociald} from '@app/utils/encStorage';
import {makeFile} from '@app/utils/file';

import type {StackScreenProps} from '@react-navigation/stack';
import type {MainNavigatorParamList} from '@app/navigators';
import type {CreateUserInput} from '@app/graphql/__generated__/graphql';
import type {ReactNativeFileType} from '@app/utils/file';

export interface SignUpScreenParams extends Omit<CreateUserInput, 'profile'> {
  profileUrl?: string;
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

  const [profile, setProfile] = useState<ReactNativeFileType>();
  const [values, setValues] = useState<Values>();

  const setValuesFn = async (params: SignUpScreenParams) => {
    const {profileUrl, ...v} = params;
    if (profileUrl) {
      const file = makeFile({
        uri: profileUrl,
        name: `${params.socialPlatform}_profile.${profileUrl.split('.').pop()}`,
        type: 'image',
      });
      setProfile(file);
    }
    setValues(v);
  };

  const createRandomNickname = async () => {
    const data = await randomNickname();

    if (data?.randomNickname.ok) {
      setValues(
        prev =>
          prev && {
            ...prev,
            nickname: data?.randomNickname.nickname ?? prev.nickname,
          },
      );
    }
  };

  const regist = async () => {
    try {
      if (values) {
        const {data} = await createUser({
          variables: {
            input: {...values, ...(profile && {profile})},
          },
        });
        if (data?.createUser.ok) {
          const socialData = {
            socialId: values.socialId,
            socialPlatform: values.socialPlatform,
          };
          const loginResult = await login(socialData);
          if (loginResult) {
            setSociald(socialData);
            navigation.reset({routes: [{name: MainNavigatorScreens.Home}]});
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
      <PictureSelectButton onChange={setProfile}>
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
