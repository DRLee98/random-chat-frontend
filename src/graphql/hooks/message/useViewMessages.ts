import {gql, useQuery} from '@apollo/client';
import {MESSAGE_BASE} from '../../fragments/message';

import type {
  QueryViewMessagesArgs,
  ViewMessagesInput,
  ViewMessagesQuery,
} from '../../types/graphql';

const VIEW_MESSAGES = gql`
  query viewMessages($input: ViewMessagesInput!) {
    viewMessages(input: $input) {
      ok
      error
      currentPage
      totalPages
      hasNextPage
      messages {
        ...MessageBase
      }
    }
  }
  ${MESSAGE_BASE}
`;

const useViewMessages = (input: ViewMessagesInput) => {
  const result = useQuery<ViewMessagesQuery, QueryViewMessagesArgs>(
    VIEW_MESSAGES,
    {
      variables: {input},
    },
  );

  const fetchMore = () => {
    if (result.loading) return;
    if (!result.data?.viewMessages.hasNextPage) return;

    const nextPage = (result.data.viewMessages?.currentPage ?? 1) + 1;

    result.fetchMore({
      variables: {
        input: {
          ...input,
          page: nextPage,
        },
      },
      updateQuery: (prev, {fetchMoreResult}) => {
        if (!prev.viewMessages.messages) return prev;
        if (!fetchMoreResult.viewMessages.messages) return prev;
        return {
          viewMessages: {
            ...fetchMoreResult.viewMessages,
            messages: [
              ...fetchMoreResult.viewMessages.messages,
              ...prev.viewMessages.messages,
            ].filter(
              (item, index, list) =>
                list.findIndex(({id}) => id === item.id) === index,
            ),
          },
        };
      },
    });
  };

  return {...result, fetchMore};
};

export default useViewMessages;
