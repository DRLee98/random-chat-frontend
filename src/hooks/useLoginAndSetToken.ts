import useLogin from '@app/graphql/hooks/user/useLogin';
import useUpdateUser from '@app/graphql/hooks/user/useUpdateUser';
import {useModal} from '@app/contexts/modalContext';

import {setToken} from '@app/utils/encStorage';
import {getFcmToken} from '@app/utils/fcm';

import type {
  LoginInput,
  LoginQuery,
  QueryLoginArgs,
} from '@app/graphql/__generated__/graphql';
import type {LazyQueryHookOptions} from '@apollo/client';

const useLoginAndSetToken = (
  options?: LazyQueryHookOptions<LoginQuery, QueryLoginArgs>,
) => {
  // const showModal = useModal();

  const [login] = useLogin(options);
  const [updateUser] = useUpdateUser();

  const loginFn = async (input: LoginInput) => {
    const data = await login({
      input,
    });

    if (data?.login.token) {
      await setToken(data.login.token);
      const fmcToken = await getFcmToken();
      updateUser({
        variables: {
          input: {
            fcmToken: fmcToken,
          },
        },
      });
      return true;
    }
    // if (data?.login.error)
    //   showModal({
    //     title: '로그인에 실패했어요',
    //     message: data.login.error,
    //     buttons: [{text: '확인'}],
    //   });
    return false;
  };

  return loginFn;
};

export default useLoginAndSetToken;
