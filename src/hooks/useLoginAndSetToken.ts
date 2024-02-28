import useLogin from '@app/graphql/hooks/user/useLogin';
import useMe from '@app/graphql/hooks/user/useMe';
import {setMeState} from '@app/atoms/userState';

import {setToken} from '@app/utils/encStorage';

import type {LoginInput} from '@app/graphql/types/graphql';

const useLoginAndSetToken = () => {
  const [login] = useLogin();
  const [me] = useMe();

  const setMe = setMeState();

  const loginFn = async (input: LoginInput) => {
    const result = await login({
      input,
    });
    if (result?.login.token) {
      await setToken(result.login.token);
      const meResult = await me();
      if (meResult?.me.me) {
        setMe(meResult.me.me);
        return true;
      }
      return false;
    } else {
      return false;
    }
  };

  return loginFn;
};

export default useLoginAndSetToken;
