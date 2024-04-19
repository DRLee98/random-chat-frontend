import {useMutation} from '@apollo/client';
import {graphql} from '@app/graphql/__generated__';

import type {MutationHookOptions} from '@apollo/client';
import type {
  ReadNotificationMutation,
  MutationReadNotificationArgs,
} from '@app/graphql/__generated__/graphql';

export const READ_NOTIFICATION = graphql(`
  mutation readNotification($input: ReadNotificationInput!) {
    readNotification(input: $input) {
      ok
      error
    }
  }
`);

const useReadNotification = (
  options?: MutationHookOptions<
    ReadNotificationMutation,
    MutationReadNotificationArgs
  >,
) => {
  return useMutation<ReadNotificationMutation, MutationReadNotificationArgs>(
    READ_NOTIFICATION,
    options,
  );
};

export default useReadNotification;
