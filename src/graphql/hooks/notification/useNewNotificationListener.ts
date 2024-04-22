import {useSubscription} from '@apollo/client';
import {graphql} from '@app/graphql/__generated__';

import type {NewNotificationSubscription} from '@app/graphql/__generated__/graphql';
import type {SubscriptionHookOptions} from '@apollo/client';

const NEW_NOTIFICATION = graphql(`
  subscription newNotification {
    newNotification {
      ...NotificationBase
    }
  }
`);

const useNewNotificationListener = (
  options?: SubscriptionHookOptions<NewNotificationSubscription>,
) => {
  return useSubscription<NewNotificationSubscription>(
    NEW_NOTIFICATION,
    options,
  );
};

export default useNewNotificationListener;
