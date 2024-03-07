import {gql, useQuery} from '@apollo/client';

import type {QueryHookOptions} from '@apollo/client';
import type {MeQuery} from '../../types/graphql';

export const ME = gql`
  query me {
    me {
      ok
      error
      me {
        id
        nickname
        profileUrl
        blockUserIds
      }
    }
  }
`;

const useMe = (options?: QueryHookOptions<MeQuery>) => {
  const {data, ...rest} = useQuery<MeQuery>(ME, options);

  return {me: data?.me?.me, ...rest};
};

export default useMe;
