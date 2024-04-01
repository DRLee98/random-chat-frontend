import {createStackNavigator} from '@react-navigation/stack';

import SplashScreen from '@app/screens/splash';
import LoginScreen from '@app/screens/login';
import SignUpScreen from '@app/screens/signUp';
import HomeScreen from '@app/screens/home';
import ChatRoomScreen from '@app/screens/chatRoom';
import MeScreen from '@app/screens/user/me';
import UserScreen from '@app/screens/user';
import {NavigationContainer} from '@react-navigation/native';
import {Button, SafeAreaView, StyleSheet} from 'react-native';

import type {SignUpScreenParams} from '@app/screens/signUp';
import type {ChatRoomScreenParams} from '@app/screens/chatRoom';
import type {UserScreenScreenParams} from '@app/screens/user';

export enum MainNavigatorScreens {
  Splash = 'Splash',
  Login = 'Login',
  SignUp = 'SignUp',
  Home = 'Home',
  ChatRoom = 'ChatRoom',
  Me = 'Me',
  User = 'User',
}

export type MainNavigatorParamList = {
  Splash: undefined;
  Login: undefined;
  SignUp: SignUpScreenParams;
  Home: undefined;
  ChatRoom: ChatRoomScreenParams;
  Me: undefined;
  User: UserScreenScreenParams;
};

const Stack = createStackNavigator<MainNavigatorParamList>();

const MainNavigator = () => {
  return (
    <SafeAreaView style={styles.container}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{headerTitleAlign: 'left'}}>
          <Stack.Screen
            name={MainNavigatorScreens.Splash}
            component={SplashScreen}
            options={{headerShown: false}}
          />
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
            options={({navigation}) => ({
              title: '홈',
              headerRight: () => (
                <Button
                  title="Me"
                  onPress={() => navigation.navigate(MainNavigatorScreens.Me)}
                />
              ),
            })}
          />
          <Stack.Screen
            name={MainNavigatorScreens.ChatRoom}
            component={ChatRoomScreen}
          />
          <Stack.Screen name={MainNavigatorScreens.Me} component={MeScreen} />
          <Stack.Screen
            name={MainNavigatorScreens.User}
            component={UserScreen}
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
