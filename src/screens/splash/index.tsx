import {useEffect} from 'react';
import useLoginAndSetToken from '@app/hooks/useLoginAndSetToken';

import {Text, View} from 'react-native';

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
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Random Chat</Text>
    </View>
  );
};

export default SplashScreen;
