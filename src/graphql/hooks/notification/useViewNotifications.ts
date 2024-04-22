import {useApolloClient, useQuery} from '@apollo/client';
import {
  FragmentType,
  getFragmentData,
  graphql,
} from '@app/graphql/__generated__';

import {NOTIFICATION_BASE} from '@app/graphql/fragments/notification';

import type {QueryHookOptions} from '@apollo/client';
import type {
  ViewNotificationsInput,
  ViewNotificationsQuery,
  QueryViewNotificationsArgs,
  NotificationBaseFragment,
} from '@app/graphql/__generated__/graphql';

export const VIEW_NOTIFICATION = graphql(`
  query viewNotifications($input: ViewNotificationsInput!) {
    viewNotifications(input: $input) {
      ok
      error
      hasNext
      notifications {
        ...NotificationBase
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

  const notifications =
    getFragmentData(NOTIFICATION_BASE, data?.viewNotifications.notifications) ??
    [];

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
    notifications,
  };
};

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

    const notifications =
      getFragmentData(
        NOTIFICATION_BASE,
        data?.viewNotifications.notifications,
      ) ?? [];

    return notifications;
  };

  const updateFn = (notifications: NotificationBaseFragment[]) => {
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

  const appendNotification = (
    newNotification: FragmentType<typeof NOTIFICATION_BASE>,
  ) => {
    const notifications = getPrevData();
    const newNotificationData = getFragmentData(
      NOTIFICATION_BASE,
      newNotification,
    );
    const updateNotifications = [newNotificationData, ...notifications];
    updateFn(updateNotifications);
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
    appendNotification,
    readNotification,
    readAllNotifications,
    removeNotification,
    removeReadNotifications,
  };
};

export default useViewNotifications;
