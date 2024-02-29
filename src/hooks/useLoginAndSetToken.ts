import useLogin from '@app/graphql/hooks/user/useLogin';

import {setToken} from '@app/utils/encStorage';

import type {LoginInput} from '@app/graphql/types/graphql';

const useLoginAndSetToken = () => {
  const [login] = useLogin();

  const loginFn = async (input: LoginInput) => {
    const result = await login({
      input,
    });
    if (result?.login.token) {
      await setToken(result.login.token);
      return true;
    } else {
      return false;
    }
  };

  return loginFn;
};

export default useLoginAndSetToken;
