import {gql, useSubscription} from '@apollo/client';

import type {
  ReadMessageSubscription,
  SubscriptionReadMessageArgs,
} from '../../types/graphql';
import type {SubscriptionHookOptions} from '@apollo/client';

const READ_MESSAGE = gql`
  subscription readMessage($input: ReadMessageInput!) {
    readMessage(input: $input) {
      messages {
        id
        readUsersId
      }
    }
  }
`;

interface Options
  extends SubscriptionHookOptions<
    ReadMessageSubscription,
    SubscriptionReadMessageArgs
  > {}

const useReadMessageListener = (options: Options) => {
  return useSubscription<ReadMessageSubscription, SubscriptionReadMessageArgs>(
    READ_MESSAGE,
    options,
  );
};

export default useReadMessageListener;
