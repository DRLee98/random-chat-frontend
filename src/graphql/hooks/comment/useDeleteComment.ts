import {useMutation} from '@apollo/client';
import {graphql} from '@app/graphql/__generated__';

import type {MutationHookOptions} from '@apollo/client';
import type {
  DeleteCommentMutation,
  MutationDeleteCommentArgs,
} from '@app/graphql/__generated__/graphql';

const DELETE_COMMENT = graphql(`
  mutation deleteComment($input: DeleteCommentInput!) {
    deleteComment(input: $input) {
      ok
      error
    }
  }
`);

const useDeleteComment = (
  options?: MutationHookOptions<
    DeleteCommentMutation,
    MutationDeleteCommentArgs
  >,
) => {
  return useMutation<DeleteCommentMutation, MutationDeleteCommentArgs>(
    DELETE_COMMENT,
    options,
  );
};

export default useDeleteComment;
