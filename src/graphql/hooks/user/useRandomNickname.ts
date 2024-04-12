import {graphql} from '@app/graphql/__generated__';
import useCustomLazyQuery from '@app/graphql/utils/useCustomLazyQuery';

import type {LazyQueryHookOptions} from '@apollo/client';
import type {RandomNicknameQuery} from '@app/graphql/__generated__/graphql';

const RANDOM_NICKNAME = graphql(`
  query randomNickname {
    randomNickname {
      ok
      error
      nickname
    }
  }
`);

const useRandomNickname = (
  options?: LazyQueryHookOptions<RandomNicknameQuery>,
) => {
  return useCustomLazyQuery<RandomNicknameQuery>(RANDOM_NICKNAME, {
    ...options,
    fetchPolicy: 'no-cache',
  });
};

export default useRandomNickname;
