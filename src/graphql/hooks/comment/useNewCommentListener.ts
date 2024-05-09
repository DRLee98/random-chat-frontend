import {useSubscription} from '@apollo/client';
import {graphql} from '@app/graphql/__generated__';

import type {
  NewCommentSubscription,
  SubscriptionNewCommentArgs,
} from '@app/graphql/__generated__/graphql';
import type {SubscriptionHookOptions} from '@apollo/client';

const NEW_COMMENT = graphql(`
  subscription newComment($input: NewCommentInput!) {
    newComment(input: $input) {
      ...CommentBase
    }
  }
`);

const useNewCommentListener = (
  options?: SubscriptionHookOptions<
    NewCommentSubscription,
    SubscriptionNewCommentArgs
  >,
) => {
  return useSubscription<NewCommentSubscription, SubscriptionNewCommentArgs>(
    NEW_COMMENT,
    options,
  );
};

export default useNewCommentListener;
