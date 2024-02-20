import {useEffect, useState} from 'react';
import useCreateUser from '@app/graphql/hooks/useCreateUser';

import {
  ActionSheetIOS,
  Alert,
  Button,
  Platform,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import ProfileImg from '@app/components/common/ProfileImg';

import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {ReactNativeFile} from 'apollo-upload-client';

import {MainNavigatorScreens} from '@app/navigators';

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

const SignUpScreen = ({route}: SignUpScreenProps) => {
  const [createUser] = useCreateUser();
  const [profile, setProfile] = useState<Profile>();
  const [values, setValues] = useState<Values>();

  const pickImage = async () => {
    const result = await launchImageLibrary({
      mediaType: 'photo',
      selectionLimit: 1,
    });
    if (result.didCancel || !result.assets) {
      return null;
    }
    setImage(result.assets[0]);
  };

  const takeImage = async () => {
    const result = await launchCamera({
      mediaType: 'photo',
      cameraType: 'back',
    });
    if (result.didCancel || !result.assets) {
      return null;
    }
    setImage(result.assets[0]);
  };

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

  const press = () => {
    if (Platform.OS === 'ios') {
      ActionSheetIOS.showActionSheetWithOptions(
        {options: ['취소', '사진선택', '사진촬영'], cancelButtonIndex: 0},
        index => {
          if (index === 1) {
            pickImage();
          }
          if (index === 2) {
            takeImage();
          }
        },
      );
    } else {
      Alert.alert('프로필 이미지 업로드', undefined, [
        {text: '사진선택', onPress: pickImage},
        {text: '사진촬영', onPress: takeImage},
      ]);
    }
  };

  const setValuesFn = async (params: SignUpScreenParams) => {
    const {profileUrl, ...rest} = params;
    if (profileUrl) {
      const file = new ReactNativeFile({
        uri: params.profileUrl,
        name: `${params.socialPlatform}_profile.${profileUrl.split('.').pop()}`,
        type: 'image',
      });
      setProfile({uri: profileUrl, file});
    }
    setValues(rest);
  };

  const regist = async () => {
    try {
      if (values) {
        console.log('profile', profile);
        const result = await createUser({
          variables: {input: {...values, profile: profile?.file}},
        });
        console.log('result', result);
      }
    } catch (error) {
      console.error('error', error);
    }
  };

  useEffect(() => {
    setValuesFn(route.params);
  }, [route.params]);

  return (
    <View style={{alignItems: 'center', justifyContent: 'center', flex: 1}}>
      <TouchableOpacity onPress={press}>
        <ProfileImg url={profile?.uri} />
      </TouchableOpacity>
      <TextInput placeholder="nickname" value={values?.nickname} />
      <Button title="가입하기" onPress={regist} />
    </View>
  );
};

export default SignUpScreen;
