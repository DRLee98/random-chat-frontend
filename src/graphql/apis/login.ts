import axios from 'axios';

import Config from 'react-native-config';

import type {LoginInput, LoginQuery} from '../types/graphql';
import type {QueryResult} from '@apollo/client';

const login = async (input: LoginInput) => {
  const {data} = await axios.post<QueryResult<LoginQuery>>(
    Config.API_URL,
    {
      query: `query login($input: LoginInput!) {
        login(input: $input) {
          ok
          error
          token
        }
      }`,
      variables: {input},
    },
    {
      headers: {
        'Content-Type': 'application/json',
      },
    },
  );

  return data.data?.login.token;
};

export default login;
