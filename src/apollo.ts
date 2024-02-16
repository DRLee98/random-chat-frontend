import {ApolloClient, InMemoryCache} from '@apollo/client';

import Config from 'react-native-config';

export const client = new ApolloClient({
  uri: Config.API_URL,
  cache: new InMemoryCache(),
});
