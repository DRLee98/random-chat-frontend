import {useMutation} from '@apollo/client';
import {graphql} from '@app/graphql/__generated__';

import type {MutationHookOptions} from '@apollo/client';
import type {ReadAllNotificationsMutation} from '@app/graphql/__generated__/graphql';

export const READ_ALL_NOTIFICATIONS = graphql(`
  mutation readAllNotifications {
    readAllNotifications {
      ok
      error
    }
  }
`);

const useReadAllNotifications = (
  options?: MutationHookOptions<ReadAllNotificationsMutation>,
) => {
  return useMutation<ReadAllNotificationsMutation>(
    READ_ALL_NOTIFICATIONS,
    options,
  );
};

export default useReadAllNotifications;
