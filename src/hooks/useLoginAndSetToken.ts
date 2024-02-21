import useLogin from '@app/graphql/hooks/useLogin';
import {LoginInput} from '@app/graphql/types/graphql';

import {setToken} from '@app/utils/encStorage';

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
