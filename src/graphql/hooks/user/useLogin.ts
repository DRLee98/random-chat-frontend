import {gql} from '@apollo/client';
import useCustomLazyQuery from '../../utils/useCustomLazyQuery';

import type {LoginQuery, QueryLoginArgs} from '../../types/graphql';

const LOGIN = gql`
  query login($input: LoginInput!) {
    login(input: $input) {
      ok
      error
      token
    }
  }
`;

const useLogin = () => {
  return useCustomLazyQuery<LoginQuery, QueryLoginArgs>(LOGIN, {
    fetchPolicy: 'no-cache',
  });
};

export default useLogin;
