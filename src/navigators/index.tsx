import {useEffect} from 'react';
import styled, {useTheme} from 'styled-components/native';
import {useNavigation} from '@react-navigation/native';

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
import SettingsNavigator, {SettingsNavigatorScreens} from './settings';
import Icon from 'react-native-vector-icons/Ionicons';
import HeaderBackIcon from '@app/components/common/HeaderBackIcon';
import NotificationIcon from '@app/components/notification/NotificationIcon';

import {StackActions} from '@react-navigation/native';

import messaging from '@react-native-firebase/messaging';

import {requestUserPermission} from '@app/utils/fcm';
import {bottomToTopScreen, getDefaultScreenOptions} from './utils';

import type {SignUpScreenParams} from '@app/screens/signUp';
import type {ChatRoomScreenParams} from '@app/screens/chatRoom';
import type {ChatRoomEditScreenParams} from '@app/screens/chatRoom/edit';
import type {UserScreenScreenParams} from '@app/screens/user';
import type {NavigationProp} from '@react-navigation/native';

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
  SettingsStack: undefined;
};

const Stack = createStackNavigator<MainNavigatorParamList>();

const MainNavigator = () => {
  const theme = useTheme();
  const navigation = useNavigation<NavigationProp<MainNavigatorParamList>>();

  const defaultScreenOptions = getDefaultScreenOptions({theme});

  useEffect(() => {
    requestUserPermission();

    const messageModule = messaging();

    const unsubscribeOpenApp = messageModule.onNotificationOpenedApp(
      remoteMessage => {
        if (remoteMessage.data) {
          if (remoteMessage.data?.roomId) {
            navigation.navigate(MainNavigatorScreens.ChatRoom, {
              roomId: remoteMessage.data.roomId as string,
              chatRoomName: null,
              newMessageCount: 1,
            });
            return;
          }
          if (remoteMessage.data?.opinionId) {
            const action = StackActions.push(
              MainNavigatorScreens.SettingsStack,
              {
                screen: SettingsNavigatorScreens.OpinionDetail,
                params: {id: remoteMessage.data.opinionId},
              },
            );
            navigation.dispatch(action);
            return;
          }
        }
      },
    );

    const unsubscribe = messageModule.onMessage(async remoteMessage => {
      console.log('A new FCM message arrived!', JSON.stringify(remoteMessage));
    });

    return () => {
      unsubscribe();
      unsubscribeOpenApp();
    };
  }, []);
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
