import {useEffect} from 'react';
import useLoginAndSetToken from '@app/hooks/useLoginAndSetToken';

import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/FontAwesome5';

import {getSociald, removeSociald} from '@app/utils/encStorage';

import {MainNavigatorScreens} from '@app/navigators';

import type {StackScreenProps} from '@react-navigation/stack';
import type {MainNavigatorParamList} from '@app/navigators';

interface SplashScreenProps
  extends StackScreenProps<
    MainNavigatorParamList,
    MainNavigatorScreens.Splash
  > {}

const SplashScreen = ({navigation}: SplashScreenProps) => {
  const login = useLoginAndSetToken();

  const checkData = async () => {
    const socialData = await getSociald();
    if (socialData) {
      const result = await login(socialData);
      if (result) {
        return navigation.replace(MainNavigatorScreens.Home);
      }
      removeSociald();
    }
    navigation.replace(MainNavigatorScreens.Login);
  };

  useEffect(() => {
    checkData();
  }, []);

  return (
    <Container>
      <StyledIcon name="dice" size={80} />
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;

  background-color: ${({theme}) => theme.bgColor};
`;

const StyledIcon = styled(Icon)`
  color: ${({theme}) => theme.primary.default};
`;

export default SplashScreen;
