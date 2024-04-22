import {useApolloClient, useQuery} from '@apollo/client';
import {graphql} from '@app/graphql/__generated__';

import type {QueryHookOptions} from '@apollo/client';
import type {UnReadNotificationCountQuery} from '@app/graphql/__generated__/graphql';

const UN_READ_NOTIFICATION_COUNT = graphql(`
  query unReadNotificationCount {
    unReadNotificationCount {
      ok
      error
      count
    }
  }
`);

const useUnReadNotificationCount = (
  options?: Omit<QueryHookOptions<UnReadNotificationCountQuery>, 'variables'>,
) => {
  const {data, ...result} = useQuery<UnReadNotificationCountQuery>(
    UN_READ_NOTIFICATION_COUNT,
    {
      ...options,
    },
  );

  return {...result, count: data?.unReadNotificationCount?.count};
};

export const useUpdateUnReadNotificationCount = () => {
  const client = useApolloClient();

  const updateUnReadCount = (count: number) => {
    client.cache.updateQuery<UnReadNotificationCountQuery>(
      {query: UN_READ_NOTIFICATION_COUNT},
      prev =>
        prev?.unReadNotificationCount && {
          ...prev,
          unReadNotificationCount: {
            ...prev.unReadNotificationCount,
            count,
          },
        },
    );
  };

  const updateIncreaseUnReadCount = (count: number) => {
    client.cache.updateQuery<UnReadNotificationCountQuery>(
      {query: UN_READ_NOTIFICATION_COUNT},
      prev =>
        prev?.unReadNotificationCount && {
          ...prev,
          unReadNotificationCount: {
            ...prev.unReadNotificationCount,
            count: prev.unReadNotificationCount.count
              ? prev.unReadNotificationCount.count + count
              : count,
          },
        },
    );
  };

  const updateDecreaseUnReadCount = (count: number) => {
    client.cache.updateQuery<UnReadNotificationCountQuery>(
      {query: UN_READ_NOTIFICATION_COUNT},
      prev =>
        prev?.unReadNotificationCount && {
          ...prev,
          unReadNotificationCount: {
            ...prev.unReadNotificationCount,
            count: prev.unReadNotificationCount.count
              ? prev.unReadNotificationCount.count - count
              : 0,
          },
        },
    );
  };

  return {
    updateUnReadCount,
    updateIncreaseUnReadCount,
    updateDecreaseUnReadCount,
  };
};

export default useUnReadNotificationCount;
