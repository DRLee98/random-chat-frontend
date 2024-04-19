import {useMutation} from '@apollo/client';
import {graphql} from '@app/graphql/__generated__';

import type {MutationHookOptions} from '@apollo/client';
import type {DeleteReadNotificationsMutation} from '@app/graphql/__generated__/graphql';

export const DELETE_READ_NOTIFICATIONS = graphql(`
  mutation deleteReadNotifications {
    deleteReadNotifications {
      ok
      error
    }
  }
`);

const useDeleteReadNotifications = (
  options?: MutationHookOptions<DeleteReadNotificationsMutation>,
) => {
  return useMutation<DeleteReadNotificationsMutation>(
    DELETE_READ_NOTIFICATIONS,
    options,
  );
};

export default useDeleteReadNotifications;
