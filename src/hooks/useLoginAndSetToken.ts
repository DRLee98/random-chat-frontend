import useLogin from '@app/graphql/hooks/user/useLogin';

import {setToken} from '@app/utils/encStorage';

import type {
  LoginInput,
  LoginQuery,
  QueryLoginArgs,
} from '@app/graphql/types/graphql';
import type {LazyQueryHookOptions} from '@apollo/client';

const useLoginAndSetToken = (
  options?: LazyQueryHookOptions<LoginQuery, QueryLoginArgs>,
) => {
  const [login] = useLogin(options);

  const loginFn = async (input: LoginInput) => {
    const data = await login({
      input,
    });

    if (data?.login.token) {
      await setToken(data.login.token);
      return true;
    }
    return false;
  };

  return loginFn;
};

export default useLoginAndSetToken;
