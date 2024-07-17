import styled, {useTheme} from 'styled-components/native';

import {createStackNavigator} from '@react-navigation/stack';

import {Platform, TouchableOpacity} from 'react-native';
import SplashScreen from '@app/screens/splash';
import LoginScreen from '@app/screens/login';
import SignUpScreen from '@app/screens/signUp';
import HomeScreen from '@app/screens/home';
import ChatRoomScreen from '@app/screens/chatRoom';
import MeScreen from '@app/screens/user/me';
import UserScreen from '@app/screens/user';
import ChatRoomEditScreen from '@app/screens/chatRoom/edit';
import NotificationScreen from '@app/screens/notification';
import AccusationScreen from '@app/screens/accusation';
import SettingsNavigator from './settings';
import Icon from 'react-native-vector-icons/Ionicons';
import HeaderBackIcon from '@app/components/common/HeaderBackIcon';
import NotificationIcon from '@app/components/notification/NotificationIcon';

import {bottomToTopScreen, getDefaultScreenOptions} from './utils';

import type {SignUpScreenParams} from '@app/screens/signUp';
import type {ChatRoomScreenParams} from '@app/screens/chatRoom';
import type {ChatRoomEditScreenParams} from '@app/screens/chatRoom/edit';
import type {UserScreenScreenParams} from '@app/screens/user';
import type {AccusationScreenParams} from '@app/screens/accusation';

export enum MainNavigatorScreens {
  Splash = 'Splash',
  Login = 'Login',
  SignUp = 'SignUp',
  Home = 'Home',
  ChatRoom = 'ChatRoom',
  ChatRoomEdit = 'ChatRoomEdit',
  Me = 'Me',
  User = 'User',
  Notification = 'Notification',
  Accusation = 'Accusation',
  SettingsStack = 'SettingsStack',
}

export type MainNavigatorParamList = {
  Splash: undefined;
  Login: undefined;
  SignUp: SignUpScreenParams;
  Home: undefined;
  ChatRoom: ChatRoomScreenParams;
  ChatRoomEdit: ChatRoomEditScreenParams;
  Me: undefined;
  User: UserScreenScreenParams;
  Notification: undefined;
  Accusation: AccusationScreenParams;
  SettingsStack: undefined;
};

const Stack = createStackNavigator<MainNavigatorParamList>();

const MainNavigator = () => {
  const theme = useTheme();

  const defaultScreenOptions = getDefaultScreenOptions({theme});

  return (
    <Container behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <Stack.Navigator
        screenOptions={{
          ...defaultScreenOptions,
          headerBackImage: () => <HeaderBackIcon<MainNavigatorParamList> />,
        }}
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
          options={{
            headerTitle: '회원가입',
          }}
        />
        <Stack.Screen
          name={MainNavigatorScreens.Home}
          component={HomeScreen}
          options={({navigation}) => ({
            title: '홈',
            headerRight: () => (
              <FlexBox>
                <NotificationIcon />
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate(MainNavigatorScreens.SettingsStack);
                  }}>
                  <Icon
                    name="settings-outline"
                    color={theme.fontColor}
                    size={24}
                  />
                </TouchableOpacity>
              </FlexBox>
            ),
            headerTitleStyle: {
              ...(typeof defaultScreenOptions.headerTitleStyle === 'object'
                ? defaultScreenOptions.headerTitleStyle
                : {}),
              fontSize: 18,
            },
            headerTitleAlign: 'left',
          })}
        />
        <Stack.Screen
          name={MainNavigatorScreens.ChatRoom}
          component={ChatRoomScreen}
          options={{
            title: '',
          }}
        />
        <Stack.Screen
          name={MainNavigatorScreens.ChatRoomEdit}
          component={ChatRoomEditScreen}
          options={{
            title: '채팅방 수정',
          }}
        />
        <Stack.Screen
          name={MainNavigatorScreens.Notification}
          component={NotificationScreen}
          options={{
            title: '알림 목록',
          }}
        />
        <Stack.Screen
          name={MainNavigatorScreens.Accusation}
          component={AccusationScreen}
          options={{
            title: '신고하기',
          }}
        />
        <Stack.Screen
          name={MainNavigatorScreens.Me}
          component={MeScreen}
          options={bottomToTopScreen}
        />
        <Stack.Screen
          name={MainNavigatorScreens.User}
          component={UserScreen}
          options={bottomToTopScreen}
        />
        <Stack.Screen
          name={MainNavigatorScreens.SettingsStack}
          component={SettingsNavigator}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </Container>
  );
};

const Container = styled.KeyboardAvoidingView`
  flex: 1;
`;

const FlexBox = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 18px;
`;

export default MainNavigator;
