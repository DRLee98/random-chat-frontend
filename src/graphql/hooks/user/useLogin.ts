import {gql} from '@apollo/client';
import useCustomLazyQuery from '../../utils/useCustomLazyQuery';

import type {LazyQueryHookOptions} from '@apollo/client';
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

const useLogin = (
  options?: LazyQueryHookOptions<LoginQuery, QueryLoginArgs>,
) => {
  return useCustomLazyQuery<LoginQuery, QueryLoginArgs>(LOGIN, {
    ...options,
    fetchPolicy: 'no-cache',
  });
};

export default useLogin;
