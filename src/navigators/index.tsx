import styled, {useTheme} from 'styled-components/native';

import {createStackNavigator} from '@react-navigation/stack';

import SplashScreen from '@app/screens/splash';
import LoginScreen from '@app/screens/login';
import SignUpScreen from '@app/screens/signUp';
import HomeScreen from '@app/screens/home';
import ChatRoomScreen from '@app/screens/chatRoom';
import MeScreen from '@app/screens/user/me';
import UserScreen from '@app/screens/user';
import ChatRoomEditScreen from '@app/screens/chatRoom/edit';
import SettingsScreen from '@app/screens/settings';
import {NavigationContainer} from '@react-navigation/native';
import {Platform, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import type {SignUpScreenParams} from '@app/screens/signUp';
import type {ChatRoomScreenParams} from '@app/screens/chatRoom';
import type {ChatRoomEditScreenParams} from '@app/screens/chatRoom/edit';
import type {UserScreenScreenParams} from '@app/screens/user';
import type {TextStyle} from 'react-native';

export enum MainNavigatorScreens {
  Splash = 'Splash',
  Login = 'Login',
  SignUp = 'SignUp',
  Home = 'Home',
  ChatRoom = 'ChatRoom',
  ChatRoomEdit = 'ChatRoomEdit',
  Me = 'Me',
  User = 'User',
  Settings = 'Settings',
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
  Settings: undefined;
};

const Stack = createStackNavigator<MainNavigatorParamList>();

const MainNavigator = () => {
  const theme = useTheme();

  const headerTitleStyles: TextStyle = {
    color: theme.fontColor,
    fontSize: 18,
    fontWeight: '400',
  };

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
            headerTitleStyle: {...headerTitleStyles},
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
            options={{
              headerTitle: '회원가입',
              headerTitleAlign: 'center',
              headerBackTitleVisible: false,
              headerTitleStyle: {
                ...headerTitleStyles,
              },
            }}
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
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate(MainNavigatorScreens.Settings);
                    }}>
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
              title: '',
              headerTitle: '',
              headerTitleAlign: 'center',
              headerBackTitleVisible: false,
              headerTitleStyle: {
                ...headerTitleStyles,
                fontSize: 16,
              },
            }}
          />
          <Stack.Screen
            name={MainNavigatorScreens.ChatRoomEdit}
            component={ChatRoomEditScreen}
            options={{
              title: '채팅방 수정',
              headerTitleAlign: 'center',
              headerBackTitleVisible: false,
              headerTitleStyle: {
                ...headerTitleStyles,
                fontSize: 16,
              },
            }}
          />
          <Stack.Screen
            name={MainNavigatorScreens.Me}
            component={MeScreen}
            options={{
              headerShown: false,
              presentation: 'modal',
            }}
          />
          <Stack.Screen
            name={MainNavigatorScreens.User}
            component={UserScreen}
            options={{
              headerShown: false,
              presentation: 'modal',
            }}
          />
          <Stack.Screen
            name={MainNavigatorScreens.Settings}
            component={SettingsScreen}
            options={{
              title: '설정',
              headerBackTitleVisible: false,
              headerTitleAlign: 'center',
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
