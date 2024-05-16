import {useEffect, useState} from 'react';
import useMeDetail, {
  useUpdateMeDetail,
} from '@app/graphql/hooks/user/useMeDetail';
import {useUpdateMe} from '@app/graphql/hooks/user/useMe';
import {useTheme} from 'styled-components/native';
import useForm from '@app/hooks/useForm';
import useUpdateUser from '@app/graphql/hooks/user/useUpdateUser';
import {useModal} from '@app/contexts/modalContext';

import styled from 'styled-components/native';

import ProfileImg from '@app/components/user/ProfileImg';
import SocialPlatformLogo from '@app/components/common/SocialPlatformLogo';
import UnderlineInput from '@app/components/common/input/UnderlineInput';
import PictureSelectButton from '@app/components/common/PictureSelectButton';
import Icon from 'react-native-vector-icons/Ionicons';

import {MainNavigatorScreens} from '@app/navigators';

import type {StackScreenProps} from '@react-navigation/stack';
import type {MainNavigatorParamList} from '@app/navigators';
import type {
  MeDetail,
  UpdateUserInput,
} from '@app/graphql/__generated__/graphql';
import type {FilterNull} from 'types/utils';
import type {ReactNativeFileType} from '@app/utils/file';

interface FormValues
  extends FilterNull<Pick<UpdateUserInput, 'nickname' | 'bio'>> {
  profile?: ReactNativeFileType;
}

interface MeScreenProps
  extends StackScreenProps<MainNavigatorParamList, MainNavigatorScreens.Me> {}

const MeScreen = ({navigation}: MeScreenProps) => {
  const theme = useTheme();
  const showModal = useModal();

  const {me} = useMeDetail();
  const updateMe = useUpdateMe();
  const updateMeDetail = useUpdateMeDetail();
  const [updateUser] = useUpdateUser();

  const [edit, setEdit] = useState(false);
  const {getProps, setFieldValue, values} = useForm<FormValues>();

  const toggleEdit = () => setEdit(prev => !prev);

  const onProfileChange = (file: ReactNativeFileType[]) => {
    setFieldValue('profile', file[0]);
  };

  const onRightButtonPress = () => {
    if (edit) {
      return onSave();
    }
    toggleEdit();
  };

  const onLeftButtonPress = () => {
    if (edit) {
      return toggleEdit();
    }
    navigation.goBack();
  };

  const onSave = async () => {
    const input: FormValues = {};
    if (values?.nickname && values.nickname !== me?.nickname)
      input.nickname = values.nickname;
    if (values?.bio && values.bio !== me?.bio) input.bio = values.bio;
    if (values?.profile) input.profile = values.profile;

    const {data} = await updateUser({
      variables: {
        input,
      },
    });
    if (data?.updateUser.ok) {
      const {profile, ...updateValues} = input;
      const updateCacheValues: Partial<Omit<MeDetail, '__typename'>> = {
        ...updateValues,
      };

      if (profile) updateCacheValues.profileUrl = profile.uri;

      updateMe(updateCacheValues);
      updateMeDetail(updateCacheValues);
      toggleEdit();
    }
    if (data?.updateUser.error) {
      showModal({
        title: '유저 정보 수정에 실패했어요',
        message: data.updateUser.error,
        buttons: [{text: '확인'}],
      });
    }
  };

  useEffect(() => {
    if (me) {
      setFieldValue('nickname', me.nickname);
      me.bio && setFieldValue('bio', me.bio);
    }
  }, [me]);

  if (!me) return null;
  return (
    <SafeAreaView>
      <Container>
        <ProfileImgBox>
          <ProfileImg
            id={me.id}
            size={120}
            url={values?.profile?.uri ?? me.profileUrl}
          />
          {edit && (
            <ProfileEditButtonBox>
              <PictureSelectButton onChange={onProfileChange} />
            </ProfileEditButtonBox>
          )}
        </ProfileImgBox>
        <NicknameBox>
          {edit ? (
            <NicknameInput
              textAlign="center"
              placeholder="닉네임을 입력해 주세요."
              returnKeyType="done"
              {...getProps('nickname')}
            />
          ) : (
            <>
              <Nickname>{me.nickname}</Nickname>
              <SocialPlatformLogo socialPlatform={me.socialPlatform} />
            </>
          )}
        </NicknameBox>
        {edit ? (
          <BioInput
            textAlign="center"
            placeholder="상태메시지를 입력해 주세요."
            returnKeyType="done"
            multiline
            numberOfLines={3}
            {...getProps('bio')}
          />
        ) : (
          <Bio>{me.bio}</Bio>
        )}
        <RightButton onPress={onRightButtonPress}>
          <ButtonText>{edit ? '저장' : '프로필 편집'}</ButtonText>
        </RightButton>
        <LeftButton onPress={onLeftButtonPress}>
          {edit ? (
            <ButtonText>취소</ButtonText>
          ) : (
            <Icon name="close" size={25} color={theme.fontColor} />
          )}
        </LeftButton>
      </Container>
    </SafeAreaView>
  );
};

const SafeAreaView = styled.SafeAreaView`
  flex: 1;

  background-color: ${({theme}) => theme.bgColor};
`;

const Container = styled.View`
  position: relative;

  flex: 1;
  align-items: center;

  padding: 0px 20px;
  padding-top: 50%;
`;

const ProfileImgBox = styled.View`
  position: relative;
`;

const ProfileEditButtonBox = styled.View`
  position: absolute;
  right: 0px;
  bottom: 0px;
`;

const NicknameBox = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 8px;

  margin-top: 15px;
  margin-bottom: 10px;
`;

const Nickname = styled.Text`
  font-weight: 600;
  font-size: 16px;
  color: ${({theme}) => theme.fontColor};
`;

const Bio = styled.Text`
  font-size: 14px;
  color: ${({theme}) => theme.gray100.default};
`;

const ButtonBase = styled.TouchableOpacity`
  position: absolute;
  top: 20px;

  justify-content: center;

  height: 25px;
`;

const RightButton = styled(ButtonBase)`
  right: 15px;
`;

const LeftButton = styled(ButtonBase)`
  left: 15px;
`;

const ButtonText = styled.Text`
  color: ${({theme}) => theme.fontColor};
`;

const NicknameInput = styled(UnderlineInput)`
  font-weight: 600;
  font-size: 16px;
`;

const BioInput = styled(UnderlineInput)`
  font-size: 14px;
`;

export default MeScreen;
