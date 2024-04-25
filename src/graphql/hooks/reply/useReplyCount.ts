import {QueryHookOptions, useQuery} from '@apollo/client';
import {graphql} from '@app/graphql/__generated__';

import type {
  ReplyCountInput,
  ReplyCountQuery,
  QueryReplyCountArgs,
} from '@app/graphql/__generated__/graphql';

export const REPLY_COUNT = graphql(`
  query replyCount($input: ReplyCountInput!) {
    replyCount(input: $input) {
      ok
      error
      count
    }
  }
`);

const useReplyCount = (
  input: ReplyCountInput,
  options?: Omit<
    QueryHookOptions<ReplyCountQuery, QueryReplyCountArgs>,
    'variables'
  >,
) => {
  const {data, ...result} = useQuery<ReplyCountQuery, QueryReplyCountArgs>(
    REPLY_COUNT,
    {
      ...options,
      variables: {input},
    },
  );

  const count = data?.replyCount.count ?? 0;

  return {count, ...result};
};

export default useReplyCount;
