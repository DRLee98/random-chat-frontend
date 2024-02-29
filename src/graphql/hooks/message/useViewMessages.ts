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
      hasNext
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
    if (!result.data?.viewMessages.hasNext) return;

    result.fetchMore({
      variables: {
        input: {
          ...input,
          skip: result.data.viewMessages.messages?.length ?? 0,
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
            ],
          },
        };
      },
    });
  };

  return {...result, fetchMore};
};

export default useViewMessages;
