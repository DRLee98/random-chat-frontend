import React, {useEffect, useLayoutEffect, useState} from 'react';
import {ApolloProvider} from '@apollo/client';
import {client} from './apollo';

import {SafeAreaProvider} from 'react-native-safe-area-context';

import {ThemeProvider} from 'styled-components/native';
import {lightTheme, darkTheme} from './styles/theme';

import MainNavigator from './navigators';
import ModalProvider from './contexts/modalContext';

import {Alert, Appearance} from 'react-native';
import messaging from '@react-native-firebase/messaging';
import {requestUserPermission} from '@app/utils/fcm';

import type {FirebaseMessagingTypes} from '@react-native-firebase/messaging/lib';

function App() {
  const [theme, setTheme] = useState(lightTheme);

  useEffect(() => {
    requestUserPermission();

    const unsubscribe = messaging().onMessage(
      async (remoteMessage: FirebaseMessagingTypes.RemoteMessage) => {
        Alert.alert(
          'A new FCM message arrived!',
          JSON.stringify(remoteMessage),
        );
      },
    );

    return unsubscribe;
  }, []);

  useLayoutEffect(() => {
    const initTheme = Appearance.getColorScheme();
    setTheme(initTheme === 'dark' ? darkTheme : lightTheme);
    Appearance.addChangeListener(({colorScheme}) => {
      setTheme(colorScheme === 'dark' ? darkTheme : lightTheme);
    });
  }, []);

  return (
    <SafeAreaProvider>
      <ApolloProvider client={client}>
        <ThemeProvider theme={theme}>
          <ModalProvider>
            <MainNavigator />
          </ModalProvider>
        </ThemeProvider>
      </ApolloProvider>
    </SafeAreaProvider>
  );
}

export default App;
