import React from 'react';
import {RecoilRoot} from 'recoil';
import {ApolloProvider} from '@apollo/client';
import {client} from './apollo';

import MainNavigator from './navigators';

function App() {
  return (
    <ApolloProvider client={client}>
      <RecoilRoot>
        <MainNavigator />
      </RecoilRoot>
    </ApolloProvider>
  );
}

export default App;
