import {createStackNavigator} from '@react-navigation/stack';

import LoginScreen from '@app/screens/login';
import SignUpScreen from '@app/screens/signUp';
import HomeScreen from '@app/screens/home';
import {NavigationContainer} from '@react-navigation/native';
import {SafeAreaView, StyleSheet} from 'react-native';

import type {SignUpScreenParams} from '@app/screens/signUp';

export enum MainNavigatorScreens {
  Login = 'Login',
  SignUp = 'SignUp',
  Home = 'Home',
}

export type MainNavigatorParamList = {
  Login: undefined;
  SignUp: SignUpScreenParams;
  Home: undefined;
};

const Stack = createStackNavigator<MainNavigatorParamList>();

const MainNavigator = () => {
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
          <Stack.Screen
            name={MainNavigatorScreens.Home}
            component={HomeScreen}
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
