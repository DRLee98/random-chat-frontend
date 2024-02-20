import {ApolloClient, ApolloLink, InMemoryCache, split} from '@apollo/client';
import {getMainDefinition} from '@apollo/client/utilities';
import {WebSocketLink} from '@apollo/client/link/ws';
import {createUploadLink} from 'apollo-upload-client';

import Config from 'react-native-config';

const httpLink = createUploadLink({
  uri: Config.API_URL,
  headers: {
    'Apollo-Require-Preflight': 'true',
  },
});

const wsLink = new WebSocketLink({
  uri: Config.WS_API_URL,
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
  httpLink as unknown as ApolloLink,
);

export const client = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache(),
});
