import {graphql} from '@app/graphql/__generated__';
import useCustomLazyQuery from '@app/graphql/utils/useCustomLazyQuery';

import type {LazyQueryHookOptions} from '@apollo/client';
import type {
  LoginQuery,
  QueryLoginArgs,
} from '@app/graphql/__generated__/graphql';

const LOGIN = graphql(`
  query login($input: LoginInput!) {
    login(input: $input) {
      ok
      error
      token
      suspended
    }
  }
`);

const useLogin = (
  options?: LazyQueryHookOptions<LoginQuery, QueryLoginArgs>,
) => {
  return useCustomLazyQuery<LoginQuery, QueryLoginArgs>(LOGIN, {
    ...options,
    fetchPolicy: 'no-cache',
  });
};

export default useLogin;
