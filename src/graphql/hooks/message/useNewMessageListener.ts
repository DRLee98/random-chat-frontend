import {gql, useSubscription} from '@apollo/client';
import {MESSAGE_BASE} from '../../fragments/message';

import type {
  NewMessageSubscription,
  SubscriptionNewMessageArgs,
} from '../../types/graphql';
import type {SubscriptionHookOptions} from '@apollo/client';

const NEW_MESSAGE = gql`
  subscription newMessage($input: NewMessageInput!) {
    newMessage(input: $input) {
      ...MessageBase
    }
  }
  ${MESSAGE_BASE}
`;

interface Options
  extends SubscriptionHookOptions<
    NewMessageSubscription,
    SubscriptionNewMessageArgs
  > {}

const useNewMessageListener = (options: Options) => {
  return useSubscription<NewMessageSubscription, SubscriptionNewMessageArgs>(
    NEW_MESSAGE,
    options,
  );
};

export default useNewMessageListener;
