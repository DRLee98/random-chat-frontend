import {
  ApolloClient,
  ApolloLink,
  InMemoryCache,
  from,
  split,
} from '@apollo/client';
import {setContext} from '@apollo/client/link/context';
import {getMainDefinition} from '@apollo/client/utilities';
import {WebSocketLink} from '@apollo/client/link/ws';
import {createUploadLink} from 'apollo-upload-client';
import {onError} from '@apollo/client/link/error';

import login from '@app/graphql/apis/login';

import {getSociald, getToken, setToken} from '@app/utils/encStorage';

import Config from 'react-native-config';

let token: string | null = null;
let tokenExpired = false;

const loadToken = async () => {
  if (!tokenExpired) {
    if (token) return token;
    const storageToken = await getToken();
    token = storageToken;
    return storageToken;
  }
  const socialData = await getSociald();
  if (!socialData) return;
  const newToken = await login(socialData);
  if (newToken) {
    setToken(newToken);
    tokenExpired = false;
    return newToken;
  }
  return null;
};

const httpLink = createUploadLink({
  uri: Config.API_URL,
});

const authLink = setContext(async (_, {headers}) => {
  const token = await loadToken();
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
      const token = await loadToken();
      return {
        authorization: token ? `Bearer ${token}` : '',
      };
    },
  },
});

const errorLink = onError(
  ({graphQLErrors, networkError, forward, operation}) => {
    if (graphQLErrors) {
      for (let err of graphQLErrors) {
        if (err.message === 'Suspended') {
          console.log(`[Suspended error]`);
          return;
        } else {
          switch (err.extensions?.code) {
            case 'UNAUTHENTICATED':
              tokenExpired = true;

              return forward(operation);
          }
        }
      }
    }

    if (networkError) {
      console.log(`[Network error]: ${networkError.message}`);
    }
  },
);

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
  link: from([errorLink, splitLink]),
  cache: new InMemoryCache(),
});
