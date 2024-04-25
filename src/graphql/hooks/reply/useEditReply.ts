import {useMutation} from '@apollo/client';
import {graphql} from '@app/graphql/__generated__';

import type {MutationHookOptions} from '@apollo/client';
import type {
  EditReplyMutation,
  MutationEditReplyArgs,
} from '@app/graphql/__generated__/graphql';

const EDIT_REPLY = graphql(`
  mutation editReply($input: EditReplyInput!) {
    editReply(input: $input) {
      ok
      error
      reply {
        ...ReplyBase
      }
    }
  }
`);

const useEditReply = (
  options?: MutationHookOptions<EditReplyMutation, MutationEditReplyArgs>,
) => {
  return useMutation<EditReplyMutation, MutationEditReplyArgs>(
    EDIT_REPLY,
    options,
  );
};

export default useEditReply;
