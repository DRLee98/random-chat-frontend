import {useMutation} from '@apollo/client';
import {graphql} from '@app/graphql/__generated__';

import type {MutationHookOptions} from '@apollo/client';
import type {
  CreateCommentMutation,
  MutationCreateCommentArgs,
} from '@app/graphql/__generated__/graphql';

const CREATE_COMMENT = graphql(`
  mutation createComment($input: CreateCommentInput!) {
    createComment(input: $input) {
      ok
      error
      comment {
        ...CommentBase
      }
    }
  }
`);

const useCreateComment = (
  options?: MutationHookOptions<
    CreateCommentMutation,
    MutationCreateCommentArgs
  >,
) => {
  return useMutation<CreateCommentMutation, MutationCreateCommentArgs>(
    CREATE_COMMENT,
    options,
  );
};

export default useCreateComment;
