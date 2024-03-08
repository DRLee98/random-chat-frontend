import {gql, useApolloClient, useQuery} from '@apollo/client';
import {MESSAGE_BASE} from '../../fragments/message';

import type {QueryHookOptions} from '@apollo/client';
import type {
  MessageBaseFragment,
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

const useViewMessages = (
  input: ViewMessagesInput,
  options?: Omit<
    QueryHookOptions<ViewMessagesQuery, QueryViewMessagesArgs>,
    'variables'
  >,
) => {
  const result = useQuery<ViewMessagesQuery, QueryViewMessagesArgs>(
    VIEW_MESSAGES,
    {
      ...options,
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

export const useUpdateViewMessages = (input: ViewMessagesInput) => {
  const client = useApolloClient();

  const getPrevData = () => {
    return client.readQuery<ViewMessagesQuery, QueryViewMessagesArgs>({
      query: VIEW_MESSAGES,
      variables: {input},
    });
  };

  const updateFn = (messages: MessageBaseFragment[]) => {
    client.cache.updateQuery<ViewMessagesQuery, QueryViewMessagesArgs>(
      {query: VIEW_MESSAGES, variables: {input}},
      prev =>
        prev?.viewMessages && {
          ...prev,
          viewMessages: {
            ...prev.viewMessages,
            messages,
          },
        },
    );
  };

  const updateMessage = (
    id: string,
    newMessage: Partial<MessageBaseFragment>,
  ) => {
    const prevData = getPrevData();
    const messages = (prevData?.viewMessages.messages?.map(message => {
      if (message.id === id) {
        return {
          ...message,
          ...newMessage,
        };
      }
      return message;
    }) ?? []) as MessageBaseFragment[];
    updateFn(messages);
  };

  const updateMessages = (
    newMessages: Array<
      Pick<MessageBaseFragment, 'id'> &
        Omit<Partial<MessageBaseFragment>, 'id' | '__typename'>
    >,
  ) => {
    const prevData = getPrevData();
    const messages = (prevData?.viewMessages.messages?.map(message => {
      const findMessage = newMessages.find(nMsg => nMsg.id === message.id);
      if (findMessage) {
        return {
          ...message,
          ...findMessage,
          __typename: 'MessageObjectType',
        };
      }
      return message;
    }) ?? []) as MessageBaseFragment[];
    updateFn(messages);
  };

  const appendMessage = (newMessage: MessageBaseFragment) => {
    const prevData = getPrevData();
    const messages = [
      ...(prevData?.viewMessages.messages ?? []),
      newMessage,
    ] as MessageBaseFragment[];
    updateFn(messages);
  };

  return {updateMessage, updateMessages, appendMessage};
};

export default useViewMessages;
