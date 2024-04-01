import {useSubscription} from '@apollo/client';
import {graphql} from '@app/graphql/__generated__';

import type {
  NewMessageSubscription,
  SubscriptionNewMessageArgs,
} from '@app/graphql/__generated__/graphql';
import type {SubscriptionHookOptions} from '@apollo/client';

const NEW_MESSAGE = graphql(`
  subscription newMessage($input: NewMessageInput!) {
    newMessage(input: $input) {
      ...MessageBase
    }
  }
`);

const useNewMessageListener = (
  options?: SubscriptionHookOptions<
    NewMessageSubscription,
    SubscriptionNewMessageArgs
  >,
) => {
  return useSubscription<NewMessageSubscription, SubscriptionNewMessageArgs>(
    NEW_MESSAGE,
    options,
  );
};

export default useNewMessageListener;
