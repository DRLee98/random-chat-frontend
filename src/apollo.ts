import {ApolloClient, ApolloLink, InMemoryCache, split} from '@apollo/client';
import {setContext} from '@apollo/client/link/context';
import {getMainDefinition} from '@apollo/client/utilities';
import {WebSocketLink} from '@apollo/client/link/ws';
import {createUploadLink} from 'apollo-upload-client';

import {getToken} from './utils/encStorage';

import Config from 'react-native-config';

const httpLink = createUploadLink({
  uri: Config.API_URL,
});

const authLink = setContext(async (_, {headers}) => {
  const token = await getToken();
  return {
    headers: {
      ...headers,
      'Apollo-Require-Preflight': 'true',
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const wsLink = new WebSocketLink({
  uri: Config.WS_API_URL,
  options: {
    reconnect: true,
    connectionParams: async () => {
      const token = await getToken();
      return {
        authorization: token ? `Bearer ${token}` : '',
      };
    },
  },
});

const splitLink = split(
  ({query}) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  wsLink,
  authLink.concat(httpLink as unknown as ApolloLink),
);

export const client = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache(),
});
