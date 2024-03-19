import React, {useEffect} from 'react';
import {RecoilRoot} from 'recoil';
import {ApolloProvider} from '@apollo/client';
import {client} from './apollo';

import MainNavigator from './navigators';

import {Alert} from 'react-native';
import messaging from '@react-native-firebase/messaging';

import type {FirebaseMessagingTypes} from '@react-native-firebase/messaging/lib';

function App() {
  useEffect(() => {
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

  return (
    <ApolloProvider client={client}>
      <RecoilRoot>
        <MainNavigator />
      </RecoilRoot>
    </ApolloProvider>
  );
}

export default App;
