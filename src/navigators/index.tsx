import styled, {useTheme} from 'styled-components/native';

import {TransitionPresets, createStackNavigator} from '@react-navigation/stack';

import SplashScreen from '@app/screens/splash';
import LoginScreen from '@app/screens/login';
import SignUpScreen from '@app/screens/signUp';
import HomeScreen from '@app/screens/home';
import ChatRoomScreen from '@app/screens/chatRoom';
import MeScreen from '@app/screens/user/me';
import UserScreen from '@app/screens/user';
import {NavigationContainer} from '@react-navigation/native';
import {Button, Platform, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

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
  const theme = useTheme();

  return (
    <NavigationContainer>
      <Container behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <Stack.Navigator
          screenOptions={({navigation}) => ({
            headerTitleAlign: 'left',
            headerTintColor: theme.fontColor,
            headerStyle: {
              backgroundColor: theme.bgColor,
            },
            headerLeftContainerStyle: {
              paddingLeft: 10,
            },
            headerRightContainerStyle: {
              paddingRight: 10,
            },
            headerTitleStyle: {
              color: theme.fontColor,
              fontSize: 22,
            },
            headerBackImage: ({tintColor}) => (
              <TouchableOpacity onPress={navigation.goBack}>
                <Icon name="chevron-back" color={tintColor} size={24} />
              </TouchableOpacity>
            ),
            headerShadowVisible: false,
          })}
          initialRouteName={MainNavigatorScreens.Splash}>
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
                <FlexBox>
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate(MainNavigatorScreens.Me)
                    }>
                    <Icon
                      name="person-circle-outline"
                      color={theme.fontColor}
                      size={26}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => {}}>
                    <Icon
                      name="settings-outline"
                      color={theme.fontColor}
                      size={26}
                    />
                  </TouchableOpacity>
                </FlexBox>
              ),
            })}
          />
          <Stack.Screen
            name={MainNavigatorScreens.ChatRoom}
            component={ChatRoomScreen}
            options={{
              headerBackTitleVisible: false,
              headerTitle: '',
              headerTitleAlign: 'center',
              headerTitleStyle: {
                color: theme.fontColor,
                fontSize: 16,
                fontWeight: '400',
              },
            }}
          />
          <Stack.Screen
            name={MainNavigatorScreens.Me}
            component={MeScreen}
            options={{
              headerShown: false,
              ...TransitionPresets.ModalSlideFromBottomIOS,
            }}
          />
          <Stack.Screen
            name={MainNavigatorScreens.User}
            component={UserScreen}
            options={{
              headerShown: false,
              ...TransitionPresets.ModalSlideFromBottomIOS,
            }}
          />
        </Stack.Navigator>
      </Container>
    </NavigationContainer>
  );
};

const Container = styled.KeyboardAvoidingView`
  flex: 1;
`;

const FlexBox = styled.View`
  flex-direction: row;
  gap: 15px;
`;

export default MainNavigator;
