import {createStackNavigator} from '@react-navigation/stack';

import {useRecoilState} from 'recoil';
import {user} from '@app/atoms/user';

import LoginScreen from '@app/screens/login';
import SignUpScreen from '@app/screens/signUp';
import {NavigationContainer} from '@react-navigation/native';
import {SafeAreaView, StyleSheet} from 'react-native';

import type {SignUpScreenParams} from '@app/screens/signUp';

export enum MainNavigatorScreens {
  Login = 'Login',
  SignUp = 'SignUp',
}

export type MainNavigatorParamList = {
  Login: undefined;
  SignUp: SignUpScreenParams;
};

const Stack = createStackNavigator<MainNavigatorParamList>();

const MainNavigator = () => {
  const userState = useRecoilState(user);
  console.log('userState', userState);

  return (
    <SafeAreaView style={styles.container}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name={MainNavigatorScreens.Login}
            component={LoginScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name={MainNavigatorScreens.SignUp}
            component={SignUpScreen}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default MainNavigator;
