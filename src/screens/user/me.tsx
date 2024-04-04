import useMeDetail from '@app/graphql/hooks/user/useMeDetail';
import {useTheme} from 'styled-components/native';

import styled from 'styled-components/native';

import ProfileImg from '@app/components/common/ProfileImg';
import SocialPlatformLogo from '@app/components/common/SocialPlatformLogo';
import Icon from 'react-native-vector-icons/Ionicons';

import {MainNavigatorScreens} from '@app/navigators';

import type {StackScreenProps} from '@react-navigation/stack';
import type {MainNavigatorParamList} from '@app/navigators';

interface MeScreenProps
  extends StackScreenProps<MainNavigatorParamList, MainNavigatorScreens.Me> {}

const MeScreen = ({navigation}: MeScreenProps) => {
  const theme = useTheme();

  const {me} = useMeDetail();

  if (!me) return null;
  return (
    <Container>
      <ProfileImg id={me.id} size={120} url={me.profileUrl} />
      <NicknameBox>
        <Nickname>{me.nickname}</Nickname>
        <SocialPlatformLogo socialPlatform={me.socialPlatform} />
      </NicknameBox>
      <Bio>{me.bio}</Bio>
      <EditButton>
        <EditButtonText>프로필 편집</EditButtonText>
      </EditButton>
      <CloseButton onPress={navigation.goBack}>
        <Icon name="close" size={25} color={theme.fontColor} />
      </CloseButton>
    </Container>
  );
};

const Container = styled.View`
  position: relative;

  flex: 1;
  align-items: center;

  padding: 0px 20px;
  padding-top: 50%;
  background-color: ${({theme}) => theme.bgColor};
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
  color: ${({theme}) => theme.gray100.default};
`;

const EditButton = styled.TouchableOpacity`
  position: absolute;
  top: 20px;
  right: 15px;

  justify-content: center;

  height: 25px;
`;

const EditButtonText = styled.Text`
  color: ${({theme}) => theme.fontColor};
`;

const CloseButton = styled.TouchableOpacity`
  position: absolute;
  top: 20px;
  left: 15px;
`;

export default MeScreen;
