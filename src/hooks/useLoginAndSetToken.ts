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

export type LoginResultType = 'success' | 'suspended' | 'fail';

const useLoginAndSetToken = (
  options?: LazyQueryHookOptions<LoginQuery, QueryLoginArgs>,
) => {
  const showModal = useModal();

  const [login] = useLogin(options);
  const [updateUser] = useUpdateUser();

  const loginFn = async (input: LoginInput): Promise<LoginResultType> => {
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
      return 'success';
    }
    if (data?.login.suspended) {
      showModal({
        title: '로그인에 실패했어요',
        message: data.login.error ?? '정지된 계정입니다.',
        buttons: [{text: '확인'}],
      });
      return 'suspended';
    }
    return 'fail';
  };

  return loginFn;
};

export default useLoginAndSetToken;
