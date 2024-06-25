import React, {useEffect, useLayoutEffect, useState} from 'react';
import {ApolloProvider} from '@apollo/client';
import {client} from './apollo';

import {SafeAreaProvider} from 'react-native-safe-area-context';

import {ThemeProvider} from 'styled-components/native';
import {lightTheme, darkTheme} from './styles/theme';

import {NavigationContainer} from '@react-navigation/native';
import MainNavigator from './navigators';
import ModalProvider from './contexts/modalContext';

import {Appearance} from 'react-native';
import messaging from '@react-native-firebase/messaging';

messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log('Message handled in the background!', remoteMessage);
});

function App() {
  const [theme, setTheme] = useState(lightTheme);

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
            <NavigationContainer>
              <MainNavigator />
            </NavigationContainer>
          </ModalProvider>
        </ThemeProvider>
      </ApolloProvider>
    </SafeAreaProvider>
  );
}

export default App;
