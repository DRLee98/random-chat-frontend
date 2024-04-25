import {useMutation} from '@apollo/client';
import {graphql} from '@app/graphql/__generated__';

import type {MutationHookOptions} from '@apollo/client';
import type {
  DeleteReplyMutation,
  MutationDeleteReplyArgs,
} from '@app/graphql/__generated__/graphql';

const DELETE_REPLY = graphql(`
  mutation deleteReply($input: DeleteReplyInput!) {
    deleteReply(input: $input) {
      ok
      error
    }
  }
`);

const useDeleteReply = (
  options?: MutationHookOptions<DeleteReplyMutation, MutationDeleteReplyArgs>,
) => {
  return useMutation<DeleteReplyMutation, MutationDeleteReplyArgs>(
    DELETE_REPLY,
    options,
  );
};

export default useDeleteReply;
