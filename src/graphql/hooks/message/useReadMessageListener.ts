import {useSubscription} from '@apollo/client';
import {graphql} from '@app/graphql/__generated__';

import type {
  ReadMessageSubscription,
  SubscriptionReadMessageArgs,
} from '@app/graphql/__generated__/graphql';
import type {SubscriptionHookOptions} from '@apollo/client';

const READ_MESSAGE = graphql(`
  subscription readMessage($input: ReadMessageInput!) {
    readMessage(input: $input) {
      messages {
        id
        readUsersId
      }
    }
  }
`);

const useReadMessageListener = (
  options?: SubscriptionHookOptions<
    ReadMessageSubscription,
    SubscriptionReadMessageArgs
  >,
) => {
  return useSubscription<ReadMessageSubscription, SubscriptionReadMessageArgs>(
    READ_MESSAGE,
    options,
  );
};

export default useReadMessageListener;
