import {useApolloClient, useQuery} from '@apollo/client';
import {getFragmentData, graphql} from '@app/graphql/__generated__';

import {REPLY_BASE} from '@app/graphql/fragments/reply';

import type {QueryHookOptions} from '@apollo/client';
import type {
  ViewRepliesInput,
  ViewRepliesQuery,
  QueryViewRepliesArgs,
  ReplyBaseFragment,
} from '@app/graphql/__generated__/graphql';
import type {FragmentType} from '@app/graphql/__generated__';

export const VIEW_REPLIES = graphql(`
  query viewReplies($input: ViewRepliesInput!) {
    viewReplies(input: $input) {
      ok
      error
      hasNext
      replies {
        ...ReplyBase
      }
    }
  }
`);

const useViewReplies = (
  input: ViewRepliesInput,
  options?: Omit<
    QueryHookOptions<ViewRepliesQuery, QueryViewRepliesArgs>,
    'variables'
  >,
) => {
  const {data, ...result} = useQuery<ViewRepliesQuery, QueryViewRepliesArgs>(
    VIEW_REPLIES,
    {
      ...options,
      variables: {input},
    },
  );

  const replies = getFragmentData(REPLY_BASE, data?.viewReplies.replies) ?? [];

  const fetchMore = async () => {
    if (result.networkStatus !== 7) return;
    if (!data?.viewReplies.hasNext) return;

    await result.fetchMore({
      variables: {
        input: {
          ...input,
          skip: data.viewReplies.replies?.length ?? 0,
        },
      },
      updateQuery: (prev, {fetchMoreResult}) => {
        if (!prev.viewReplies.replies) return prev;
        if (!fetchMoreResult.viewReplies.replies) return prev;
        return {
          viewReplies: {
            ...fetchMoreResult.viewReplies,
            replies: [
              ...prev.viewReplies.replies,
              ...fetchMoreResult.viewReplies.replies,
            ],
          },
        };
      },
    });
  };

  return {...result, replies, fetchMore};
};

export const useUpdateViewReplies = (input: ViewRepliesInput) => {
  const client = useApolloClient();

  const getPrevData = () => {
    const data = client.cache.readQuery<ViewRepliesQuery, QueryViewRepliesArgs>(
      {
        query: VIEW_REPLIES,
        variables: {input},
      },
    );

    const replies =
      getFragmentData(REPLY_BASE, data?.viewReplies.replies) ?? [];
    return replies;
  };

  const updateFn = (replies: ReplyBaseFragment[]) => {
    client.cache.updateQuery<ViewRepliesQuery, QueryViewRepliesArgs>(
      {query: VIEW_REPLIES, variables: {input}},
      prev =>
        prev?.viewReplies && {
          ...prev,
          viewReplies: {
            ...prev.viewReplies,
            replies,
          },
        },
    );
  };

  const updateViewReply = (
    id: string,
    newReply?: Partial<ReplyBaseFragment>,
  ) => {
    const replies = getPrevData();
    const updateReplies = replies.map(opinion => {
      if (opinion.id === id) {
        return {...opinion, ...newReply};
      }
      return opinion;
    });
    updateFn(updateReplies);
  };

  const appendViewReply = (newReply: FragmentType<typeof REPLY_BASE>) => {
    const replies = getPrevData();
    const newReplyData = getFragmentData(REPLY_BASE, newReply);
    const updateReplies = [newReplyData, ...replies];
    updateFn(updateReplies);
  };

  const removeViewReply = (id: string) => {
    const replies = getPrevData();
    const updateReplies = replies?.filter(opinion => opinion.id !== id) ?? [];
    updateFn(updateReplies);
  };

  return {updateViewReply, appendViewReply, removeViewReply};
};

export default useViewReplies;
