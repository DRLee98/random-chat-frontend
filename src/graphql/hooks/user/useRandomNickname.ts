import {gql} from '@apollo/client';
import useCustomLazyQuery from '../../utils/useCustomLazyQuery';

import type {LazyQueryHookOptions} from '@apollo/client';
import type {RandomNicknameQuery} from '../../types/graphql';

const RANDOM_NICKNAME = gql`
  query randomNickname {
    randomNickname {
      ok
      error
      nickname
    }
  }
`;

const useRandomNickname = (
  options?: LazyQueryHookOptions<RandomNicknameQuery>,
) => {
  return useCustomLazyQuery<RandomNicknameQuery>(RANDOM_NICKNAME, {
    ...options,
    fetchPolicy: 'no-cache',
  });
};

export default useRandomNickname;
