import {QueryHookOptions, useApolloClient, useQuery} from '@apollo/client';
import {graphql} from '@app/graphql/__generated__';

import type {
  CommentCountInput,
  CommentCountQuery,
  QueryCommentCountArgs,
} from '@app/graphql/__generated__/graphql';

export const COMMENT_COUNT = graphql(`
  query commentCount($input: CommentCountInput!) {
    commentCount(input: $input) {
      ok
      error
      count
    }
  }
`);

const useCommentCount = (
  input: CommentCountInput,
  options?: Omit<
    QueryHookOptions<CommentCountQuery, QueryCommentCountArgs>,
    'variables'
  >,
) => {
  const {data, ...result} = useQuery<CommentCountQuery, QueryCommentCountArgs>(
    COMMENT_COUNT,
    {
      ...options,
      variables: {input},
    },
  );

  const count = data?.commentCount.count ?? 0;

  return {count, ...result};
};

export const useUpdateCommentCount = (input: CommentCountInput) => {
  const client = useApolloClient();

  const updateIncreaseCommentCount = (count: number) => {
    client.cache.updateQuery<CommentCountQuery, QueryCommentCountArgs>(
      {query: COMMENT_COUNT, variables: {input}},
      prev =>
        prev?.commentCount && {
          ...prev,
          commentCount: {
            ...prev.commentCount,
            count: (prev.commentCount.count ?? 0) + count,
          },
        },
    );
  };

  const updateDecreaseCommentCount = (count: number) => {
    client.cache.updateQuery<CommentCountQuery, QueryCommentCountArgs>(
      {query: COMMENT_COUNT, variables: {input}},
      prev =>
        prev?.commentCount && {
          ...prev,
          commentCount: {
            ...prev.commentCount,
            count: (prev.commentCount.count ?? 0) - count,
          },
        },
    );
  };

  return {updateIncreaseCommentCount, updateDecreaseCommentCount};
};

export default useCommentCount;
