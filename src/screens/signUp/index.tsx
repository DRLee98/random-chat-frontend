import {useEffect} from 'react';
import useLoginAndSetToken from '@app/hooks/useLoginAndSetToken';
import useCreateUser from '@app/graphql/hooks/user/useCreateUser';
import useRandomNickname from '@app/graphql/hooks/user/useRandomNickname';
import {useTheme} from 'styled-components/native';
import useForm from '@app/hooks/useForm';
import {useModal} from '@app/contexts/modalContext';

import styled from 'styled-components/native';

import ProfileImg from '@app/components/user/ProfileImg';
import PictureSelectButton from '@app/components/common/PictureSelectButton';
import BorderInput from '@app/components/common/input/BorderInput';
import Icon from 'react-native-vector-icons/Ionicons';

import {ApolloError} from '@apollo/client';

import {MainNavigatorScreens} from '@app/navigators';

import {setSociald} from '@app/utils/encStorage';
import {makeFile} from '@app/utils/file';
import {getRandomColor} from '@app/utils/color';

import type {StackScreenProps} from '@react-navigation/stack';
import type {MainNavigatorParamList} from '@app/navigators';
import type {CreateUserInput} from '@app/graphql/__generated__/graphql';
import type {ReactNativeFileType} from '@app/utils/file';

export interface SignUpScreenParams
  extends Omit<
    CreateUserInput,
    'profile' | 'profileBgColor' | 'profileTextColor'
  > {
  profileUrl?: string;
}

interface FormValues extends Omit<CreateUserInput, 'profile'> {
  profile?: ReactNativeFileType;
}

interface SignUpScreenProps
  extends StackScreenProps<
    MainNavigatorParamList,
    MainNavigatorScreens.SignUp
  > {}

const SignUpScreen = ({route, navigation}: SignUpScreenProps) => {
  const theme = useTheme();
  const showModal = useModal();

  const login = useLoginAndSetToken();
  const [createUser, {loading}] = useCreateUser();
  const [randomNickname] = useRandomNickname();

  const {getProps, setFieldValue, values, setValues} = useForm<FormValues>();

  const onProfileChange = (file: ReactNativeFileType[]) => {
    setFieldValue('profile', file[0]);
  };

  const createRandomNickname = async () => {
    const data = await randomNickname();

    if (data?.randomNickname.ok && data.randomNickname.nickname) {
      setFieldValue('nickname', data.randomNickname.nickname);
    }
  };

  const regist = async () => {
    try {
      if (values) {
        if (!values.nickname) {
          showModal({
            message: '닉네임을 입력해주세요',
            buttons: [{text: '확인'}],
          });
          return;
        }
        const {data} = await createUser({
          variables: {
            input: {...values},
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
        if (data?.createUser.error) {
          showModal({
            title: '유저 생성에 실패했어요',
            message: data.createUser.error,
            buttons: [{text: '확인'}],
          });
        }
      }
    } catch (error) {
      if (error instanceof ApolloError) {
        error.graphQLErrors.forEach(e => {
          console.error('error', e.message);
          showModal({
            title: '유저 생성에 실패했어요',
            message: e.message,
            buttons: [{text: '확인'}],
          });
        });
      } else {
        console.error('error', error);
      }
    }
  };

  useEffect(() => {
    const bgColor = getRandomColor();
    const textColor = getRandomColor(bgColor);
    const {profileUrl, ...v} = route.params;
    const initValues: FormValues = {
      ...v,
      profileBgColor: bgColor,
      profileTextColor: textColor,
    };
    if (profileUrl) {
      const file = makeFile({
        uri: profileUrl,
        name: `${initValues.socialPlatform}_profile.${profileUrl
          .split('.')
          .pop()}`,
        type: 'image',
      });
      initValues.profile = file;
    }
    setValues(initValues);
    if (!initValues.nickname) {
      createRandomNickname();
    }
  }, [route.params]);

  return (
    <Container>
      <ProfileImgBox>
        <ProfileImg
          url={values.profile?.uri}
          bgColor={values.profileBgColor ?? ''}
          textColor={values.profileTextColor ?? ''}
          size={120}
        />
        {values.profile && (
          <PictureDeleteButton
            onPress={() => setFieldValue('profile', undefined)}>
            <Icon name="close-circle" size={25} color={theme.primary.default} />
          </PictureDeleteButton>
        )}
        <PictureSelectButtonBox>
          <PictureSelectButton onChange={onProfileChange} />
        </PictureSelectButtonBox>
      </ProfileImgBox>
      <BorderInput
        placeholder="닉네임을 입력해 주세요."
        right={
          <RandomNicknameButton onPress={createRandomNickname}>
            <Icon name="dice" size={25} color={theme.bgColor} />
          </RandomNicknameButton>
        }
        {...getProps('nickname')}
      />

      <RegistButton onPress={regist} disabled={loading || !values.nickname}>
        <RegistText>
          {loading ? '잠시만 기다려 주세요' : '랜덤채팅 시작하기'}
        </RegistText>
      </RegistButton>
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
  align-items: center;
  gap: 15px;

  padding: 0 30px;
  padding-top: 35%;

  background-color: ${({theme}) => theme.bgColor};
`;

const ProfileImgBox = styled.View`
  position: relative;

  margin-bottom: 30px;
`;

const PictureDeleteButton = styled.TouchableOpacity`
  position: absolute;
  right: 0px;
  top: 0px;
`;

const PictureSelectButtonBox = styled.View`
  position: absolute;
  right: 0px;
  bottom: 0px;
`;

const RandomNicknameButton = styled.TouchableOpacity`
  padding: 6px;
  background-color: ${({theme}) => theme.primary.default};
  border-radius: 999px;
`;

const RegistButton = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;

  width: 100%;
  height: 50px;
  background-color: ${({theme}) => theme.primary.default};
  border-radius: 999px;
`;

const RegistText = styled.Text`
  font-size: 16px;
  font-weight: 700;
  color: ${({theme}) => theme.bgColor};
`;

export default SignUpScreen;
