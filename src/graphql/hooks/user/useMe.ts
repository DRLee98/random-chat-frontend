import {useApolloClient, useQuery} from '@apollo/client';
import {graphql} from '@app/graphql/__generated__';

import type {QueryHookOptions} from '@apollo/client';
import type {Me, MeQuery} from '@app/graphql/__generated__/graphql';

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

export const useUpdateMe = () => {
  const client = useApolloClient();

  const updateFn = (data: Partial<Me>) => {
    client.cache.updateQuery<MeQuery>(
      {
        query: ME,
      },
      prev =>
        prev?.me.me && {
          ...prev,
          me: {
            ...prev.me,
            me: {
              ...prev.me.me,
              ...data,
            },
          },
        },
    );
  };

  return updateFn;
};

export default useMe;
