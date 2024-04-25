import {useMutation} from '@apollo/client';
import {graphql} from '@app/graphql/__generated__';

import type {MutationHookOptions} from '@apollo/client';
import type {
  EditCommentMutation,
  MutationEditCommentArgs,
} from '@app/graphql/__generated__/graphql';

const EDIT_COMMENT = graphql(`
  mutation editComment($input: EditCommentInput!) {
    editComment(input: $input) {
      ok
      error
      comment {
        ...CommentBase
      }
    }
  }
`);

const useEditComment = (
  options?: MutationHookOptions<EditCommentMutation, MutationEditCommentArgs>,
) => {
  return useMutation<EditCommentMutation, MutationEditCommentArgs>(
    EDIT_COMMENT,
    options,
  );
};

export default useEditComment;
