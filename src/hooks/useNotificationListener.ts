import {useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';

import {StackActions} from '@react-navigation/native';
import {MainNavigatorScreens} from '@app/navigators';
import {SettingsNavigatorScreens} from '@app/navigators/settings';

import messaging from '@react-native-firebase/messaging';

import type {NavigationProp} from '@react-navigation/native';
import type {MainNavigatorParamList} from '@app/navigators';
import type {FirebaseMessagingTypes} from '@react-native-firebase/messaging';

const useNotificationListener = () => {
  const navigation = useNavigation<NavigationProp<MainNavigatorParamList>>();

  const navigateNotiTarget = (
    remoteMessage: FirebaseMessagingTypes.RemoteMessage,
  ) => {
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
        const action = StackActions.push(MainNavigatorScreens.SettingsStack, {
          screen: SettingsNavigatorScreens.OpinionDetail,
          params: {id: remoteMessage.data.opinionId},
        });
        navigation.dispatch(action);
        return;
      }
    }
  };

  const checkInitNoti = async () => {
    const initialNotification = await messaging().getInitialNotification();
    if (initialNotification) {
      navigateNotiTarget(initialNotification);
    }
  };

  useEffect(() => {
    checkInitNoti();

    const messageModule = messaging();

    const unsubscribeOpenApp =
      messageModule.onNotificationOpenedApp(navigateNotiTarget);

    const unsubscribe = messageModule.onMessage(async remoteMessage => {
      console.log('A new FCM message arrived!', JSON.stringify(remoteMessage));
    });

    return () => {
      unsubscribe();
      unsubscribeOpenApp();
    };
  }, []);
};

export default useNotificationListener;
