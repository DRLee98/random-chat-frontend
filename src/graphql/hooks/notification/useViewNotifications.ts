import {useApolloClient, useQuery} from '@apollo/client';
import {graphql} from '@app/graphql/__generated__';

import type {QueryHookOptions} from '@apollo/client';
import type {
  ViewNotificationsInput,
  ViewNotificationsQuery,
  QueryViewNotificationsArgs,
} from '@app/graphql/__generated__/graphql';
import type {RequiredItem} from 'types/utils';

export const VIEW_NOTIFICATION = graphql(`
  query viewNotifications($input: ViewNotificationsInput!) {
    viewNotifications(input: $input) {
      ok
      error
      hasNext
      notifications {
        id
        title
        message
        read
        type
        data
        createdAt
      }
    }
  }
`);

const useViewNotifications = (
  input?: ViewNotificationsInput,
  options?: Omit<
    QueryHookOptions<ViewNotificationsQuery, QueryViewNotificationsArgs>,
    'variables'
  >,
) => {
  const {data, ...result} = useQuery<
    ViewNotificationsQuery,
    QueryViewNotificationsArgs
  >(VIEW_NOTIFICATION, {
    ...options,
    variables: {input: input ?? {}},
  });

  const fetchMore = async () => {
    if (result.networkStatus !== 7) return;
    if (!data?.viewNotifications.hasNext) return;

    await result.fetchMore({
      variables: {
        input: {
          ...input,
          skip: data.viewNotifications.notifications?.length ?? 0,
        },
      },
      updateQuery: (prev, {fetchMoreResult}) => {
        if (!prev.viewNotifications.notifications) return prev;
        if (!fetchMoreResult.viewNotifications.notifications) return prev;
        return {
          viewNotifications: {
            ...fetchMoreResult.viewNotifications,
            notifications: [
              ...prev.viewNotifications.notifications,
              ...fetchMoreResult.viewNotifications.notifications,
            ],
          },
        };
      },
    });
  };

  return {
    ...result,
    fetchMore,
    notifications: data?.viewNotifications.notifications,
  };
};

type Notification = RequiredItem<
  ViewNotificationsQuery['viewNotifications'],
  'notifications'
>;

export const useUpdateViewNotifications = (input?: ViewNotificationsInput) => {
  const client = useApolloClient();

  const getPrevData = () => {
    const data = client.cache.readQuery<
      ViewNotificationsQuery,
      QueryViewNotificationsArgs
    >({
      query: VIEW_NOTIFICATION,
      variables: {input: input ?? {}},
    });

    return data?.viewNotifications.notifications ?? [];
  };

  const updateFn = (notifications: Notification[]) => {
    client.cache.updateQuery<
      ViewNotificationsQuery,
      QueryViewNotificationsArgs
    >(
      {query: VIEW_NOTIFICATION, variables: {input: input ?? {}}},
      prev =>
        prev?.viewNotifications && {
          ...prev,
          viewNotifications: {
            ...prev.viewNotifications,
            notifications,
          },
        },
    );
  };

  const readNotification = (id: string) => {
    const notifications = getPrevData();
    const updateNotifications = notifications.map(notification =>
      notification.id === id ? {...notification, read: true} : notification,
    );
    updateFn(updateNotifications);
  };

  const readAllNotifications = () => {
    const notifications = getPrevData();
    const updateNotifications = notifications.map(notification => ({
      ...notification,
      read: true,
    }));
    updateFn(updateNotifications);
  };

  const removeNotification = (id: string) => {
    const notifications = getPrevData();
    const updateNotifications = notifications.filter(
      notification => notification.id !== id,
    );
    updateFn(updateNotifications);
  };

  const removeReadNotifications = () => {
    const notifications = getPrevData();
    const updateNotifications = notifications.filter(
      notification => !notification.read,
    );
    updateFn(updateNotifications);
  };

  return {
    readNotification,
    readAllNotifications,
    removeNotification,
    removeReadNotifications,
  };
};

export default useViewNotifications;
