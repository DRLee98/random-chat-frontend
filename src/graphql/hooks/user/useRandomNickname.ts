import {gql} from '@apollo/client';
import useCustomLazyQuery from '../../utils/useCustomLazyQuery';
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

const useRandomNickname = () => {
  return useCustomLazyQuery<RandomNicknameQuery>(RANDOM_NICKNAME, {
    fetchPolicy: 'no-cache',
  });
};

export default useRandomNickname;
