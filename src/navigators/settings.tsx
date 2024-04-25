import {useTheme} from 'styled-components/native';

import {createStackNavigator} from '@react-navigation/stack';

import BlockUsersScreen from '@app/screens/user/blockUsers';
import SettingsScreen from '@app/screens/settings';
import OpinionScreen from '@app/screens/opinion';
import MyOpinionsScreen from '@app/screens/opinion/myOpinions';
import OpinionDetailScreen from '@app/screens/opinion/detail';
import NoticeScreen from '@app/screens/notice';
import NoticeDetailScreen from '@app/screens/notice/detail';
import HeaderBackIcon from '@app/components/common/HeaderBackIcon';

import {getDefaultScreenOptions} from './utils';

import type {NoticeDetailScreenParams} from '@app/screens/notice/detail';
import type {OpinionDetailScreenParams} from '@app/screens/opinion/detail';

export enum SettingsNavigatorScreens {
  Settings = 'Settings',
  BlockUsers = 'BlockUsers',
  Notice = 'Notice',
  NoticeDetail = 'NoticeDetail',
  Opinion = 'Opinion',
  MyOpinions = 'MyOpinions',
  OpinionDetail = 'OpinionDetail',
}

export type SettingsNavigatorParamList = {
  Settings: undefined;
  BlockUsers: undefined;
  Notice: undefined;
  NoticeDetail: NoticeDetailScreenParams;
  Opinion: undefined;
  MyOpinions: undefined;
  OpinionDetail: OpinionDetailScreenParams;
};

const SettingsStack = createStackNavigator<SettingsNavigatorParamList>();

const SettingsNavigator = () => {
  const theme = useTheme();

  const defaultScreenOptions = getDefaultScreenOptions({theme});

  return (
    <SettingsStack.Navigator
      screenOptions={{
        ...defaultScreenOptions,
        headerBackImage: () => <HeaderBackIcon<SettingsNavigatorParamList> />,
      }}
      initialRouteName={SettingsNavigatorScreens.Settings}>
      <SettingsStack.Screen
        name={SettingsNavigatorScreens.Settings}
        component={SettingsScreen}
        options={{
          title: '설정',
        }}
      />
      <SettingsStack.Screen
        name={SettingsNavigatorScreens.BlockUsers}
        component={BlockUsersScreen}
        options={{
          title: '차단유저 관리',
        }}
      />
      <SettingsStack.Screen
        name={SettingsNavigatorScreens.Notice}
        component={NoticeScreen}
        options={{
          title: '공지사항',
        }}
      />
      <SettingsStack.Screen
        name={SettingsNavigatorScreens.NoticeDetail}
        component={NoticeDetailScreen}
        options={{
          title: '공지사항',
        }}
      />
      <SettingsStack.Screen
        name={SettingsNavigatorScreens.Opinion}
        component={OpinionScreen}
        options={{
          title: '의견 보내기',
        }}
      />
      <SettingsStack.Screen
        name={SettingsNavigatorScreens.MyOpinions}
        component={MyOpinionsScreen}
        options={{
          title: '내가 작성한 의견',
        }}
      />
      <SettingsStack.Screen
        name={SettingsNavigatorScreens.OpinionDetail}
        component={OpinionDetailScreen}
        options={{
          title: '내가 작성한 의견',
        }}
      />
    </SettingsStack.Navigator>
  );
};

export default SettingsNavigator;
