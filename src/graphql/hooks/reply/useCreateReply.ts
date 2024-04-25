import {useMutation} from '@apollo/client';
import {graphql} from '@app/graphql/__generated__';

import type {MutationHookOptions} from '@apollo/client';
import type {
  CreateReplyMutation,
  MutationCreateReplyArgs,
} from '@app/graphql/__generated__/graphql';

const CREATE_REPLY = graphql(`
  mutation createReply($input: CreateReplyInput!) {
    createReply(input: $input) {
      ok
      error
      reply {
        ...ReplyBase
      }
    }
  }
`);

const useCreateReply = (
  options?: MutationHookOptions<CreateReplyMutation, MutationCreateReplyArgs>,
) => {
  return useMutation<CreateReplyMutation, MutationCreateReplyArgs>(
    CREATE_REPLY,
    options,
  );
};

export default useCreateReply;
