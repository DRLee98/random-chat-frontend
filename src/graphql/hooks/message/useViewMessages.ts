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
  return useQuery<ViewMessagesQuery, QueryViewMessagesArgs>(VIEW_MESSAGES, {
    variables: {input},
  });
};

export default useViewMessages;
