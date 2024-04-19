import {useMutation} from '@apollo/client';
import {graphql} from '@app/graphql/__generated__';

import type {MutationHookOptions} from '@apollo/client';
import type {
  DeleteNotificationMutation,
  MutationDeleteNotificationArgs,
} from '@app/graphql/__generated__/graphql';

export const DELETE_NOTIFICATION = graphql(`
  mutation deleteNotification($input: DeleteNotificationInput!) {
    deleteNotification(input: $input) {
      ok
      error
    }
  }
`);

const useDeleteNotification = (
  options?: MutationHookOptions<
    DeleteNotificationMutation,
    MutationDeleteNotificationArgs
  >,
) => {
  return useMutation<
    DeleteNotificationMutation,
    MutationDeleteNotificationArgs
  >(DELETE_NOTIFICATION, options);
};

export default useDeleteNotification;
