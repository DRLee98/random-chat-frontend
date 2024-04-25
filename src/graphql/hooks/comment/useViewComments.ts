import {useApolloClient, useQuery} from '@apollo/client';
import {getFragmentData, graphql} from '@app/graphql/__generated__';

import {COMMENT_BASE} from '@app/graphql/fragments/comment';

import type {QueryHookOptions} from '@apollo/client';
import type {
  ViewCommentsInput,
  ViewCommentsQuery,
  QueryViewCommentsArgs,
  CommentBaseFragment,
} from '@app/graphql/__generated__/graphql';
import type {FragmentType} from '@app/graphql/__generated__';

export const VIEW_COMMENTS = graphql(`
  query viewComments($input: ViewCommentsInput!) {
    viewComments(input: $input) {
      ok
      error
      hasNext
      comments {
        ...CommentBase
      }
    }
  }
`);

const useViewComments = (
  input: ViewCommentsInput,
  options?: Omit<
    QueryHookOptions<ViewCommentsQuery, QueryViewCommentsArgs>,
    'variables'
  >,
) => {
  const {data, ...result} = useQuery<ViewCommentsQuery, QueryViewCommentsArgs>(
    VIEW_COMMENTS,
    {
      ...options,
      variables: {input},
    },
  );

  const comments =
    getFragmentData(COMMENT_BASE, data?.viewComments.comments) ?? [];

  const fetchMore = async () => {
    if (result.networkStatus !== 7) return;
    if (!data?.viewComments.hasNext) return;

    await result.fetchMore({
      variables: {
        input: {
          ...input,
          skip: data.viewComments.comments?.length ?? 0,
        },
      },
      updateQuery: (prev, {fetchMoreResult}) => {
        if (!prev.viewComments.comments) return prev;
        if (!fetchMoreResult.viewComments.comments) return prev;
        return {
          viewComments: {
            ...fetchMoreResult.viewComments,
            comments: [
              ...prev.viewComments.comments,
              ...fetchMoreResult.viewComments.comments,
            ],
          },
        };
      },
    });
  };

  return {...result, comments, fetchMore};
};

export const useUpdateViewComments = (input: ViewCommentsInput) => {
  const client = useApolloClient();

  const getPrevData = () => {
    const data = client.cache.readQuery<
      ViewCommentsQuery,
      QueryViewCommentsArgs
    >({
      query: VIEW_COMMENTS,
      variables: {input},
    });

    const comments =
      getFragmentData(COMMENT_BASE, data?.viewComments.comments) ?? [];
    return comments;
  };

  const updateFn = (comments: CommentBaseFragment[]) => {
    client.cache.updateQuery<ViewCommentsQuery, QueryViewCommentsArgs>(
      {query: VIEW_COMMENTS, variables: {input}},
      prev =>
        prev?.viewComments && {
          ...prev,
          viewComments: {
            ...prev.viewComments,
            comments,
          },
        },
    );
  };

  const updateViewComment = (
    id: string,
    newComment?: Partial<CommentBaseFragment>,
  ) => {
    const comments = getPrevData();
    const updateComment = comments.map(opinion => {
      if (opinion.id === id) {
        return {...opinion, ...newComment};
      }
      return opinion;
    });
    updateFn(updateComment);
  };

  const appendViewComment = (newComment: FragmentType<typeof COMMENT_BASE>) => {
    const comments = getPrevData();
    const newCommentData = getFragmentData(COMMENT_BASE, newComment);
    const updateComment = [newCommentData, ...comments];
    updateFn(updateComment);
  };

  const removeViewComment = (id: string) => {
    const comments = getPrevData();
    const updateComment = comments?.filter(opinion => opinion.id !== id) ?? [];
    updateFn(updateComment);
  };

  return {updateViewComment, appendViewComment, removeViewComment};
};

export default useViewComments;
