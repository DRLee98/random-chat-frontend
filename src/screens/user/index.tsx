import useMe from '@app/graphql/hooks/user/useMe';
import useUserProfile from '@app/graphql/hooks/user/useUserProfile';
import {useTheme} from 'styled-components/native';

import styled from 'styled-components/native';

import ProfileImg from '@app/components/user/ProfileImg';
import ToggleUserBlockButton from '@app/components/user/ToggleUserBlockButton';
import Icon from 'react-native-vector-icons/Ionicons';

import {MainNavigatorScreens} from '@app/navigators';

import type {StackScreenProps} from '@react-navigation/stack';
import type {MainNavigatorParamList} from '@app/navigators';

export interface UserScreenScreenParams {
  userId: string;
}

interface UserScreenProps
  extends StackScreenProps<MainNavigatorParamList, MainNavigatorScreens.User> {}

const UserScreen = ({route, navigation}: UserScreenProps) => {
  const theme = useTheme();

  const {data} = useUserProfile({
    id: route.params.userId,
  });

  if (!data?.userProfile.user) return null;
  return (
    <SafeAreaView>
      <Container>
        <ProfileImg
          id={data.userProfile.user.id}
          url={data.userProfile.user.profileUrl}
          bgColor={data.userProfile.user.profileBgColor}
          textColor={data.userProfile.user.profileTextColor}
          size={120}
        />
        <NicknameBox>
          <Nickname>{data.userProfile.user.nickname}</Nickname>
        </NicknameBox>
        <Bio>{data.userProfile.user.bio}</Bio>
        {data.userProfile.user && (
          <BlockButtonBox>
            <ToggleUserBlockButton
              userId={data.userProfile.user.id}
              nickname={data.userProfile.user.nickname}
            />
          </BlockButtonBox>
        )}
        <CloseButton onPress={navigation.goBack}>
          <Icon name="close" size={25} color={theme.fontColor} />
        </CloseButton>
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
  align-items: center;

  padding: 0px 20px;
  padding-top: 50%;
`;

const NicknameBox = styled.View`
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

const BlockButtonBox = styled.View`
  position: absolute;
  top: 20px;
  right: 15px;
`;

const CloseButton = styled.TouchableOpacity`
  position: absolute;
  top: 20px;
  left: 15px;
`;

export default UserScreen;
