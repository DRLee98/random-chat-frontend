import {useQuery} from '@apollo/client';
import {graphql} from '@app/graphql/__generated__';

import type {QueryHookOptions} from '@apollo/client';
import type {MeQuery} from '@app/graphql/__generated__/graphql';

export const ME = graphql(`
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
`);

const useMe = (options?: QueryHookOptions<MeQuery>) => {
  const {data, ...rest} = useQuery<MeQuery>(ME, options);

  return {me: data?.me?.me, ...rest};
};

export default useMe;
