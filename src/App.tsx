import React from 'react';
import {RecoilRoot} from 'recoil';
import {ApolloProvider} from '@apollo/client';
import {client} from './apollo';

import Navigator from './navigators';

function App() {
  return (
    <ApolloProvider client={client}>
      <RecoilRoot>
        <Navigator />
      </RecoilRoot>
    </ApolloProvider>
  );
}

export default App;
