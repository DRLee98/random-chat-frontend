import {useApolloClient, useQuery} from '@apollo/client';
import {getFragmentData, graphql} from '@app/graphql/__generated__';

import {MESSAGE_BASE} from '@app/graphql/fragments/message';

import type {QueryHookOptions} from '@apollo/client';
import type {
  MessageBaseFragment,
  QueryViewMessagesArgs,
  ViewMessagesInput,
  ViewMessagesQuery,
} from '@app/graphql/__generated__/graphql';
import type {FragmentType} from '@app/graphql/__generated__';

const VIEW_MESSAGES = graphql(`
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
`);

const useViewMessages = (
  input: ViewMessagesInput,
  options?: Omit<
    QueryHookOptions<ViewMessagesQuery, QueryViewMessagesArgs>,
    'variables'
  >,
) => {
  const {data, ...result} = useQuery<ViewMessagesQuery, QueryViewMessagesArgs>(
    VIEW_MESSAGES,
    {
      ...options,
      variables: {input},
    },
  );

  const messages =
    getFragmentData(MESSAGE_BASE, data?.viewMessages.messages) ?? [];

  const fetchMore = async () => {
    if (result.networkStatus !== 7) return;
    if (!data?.viewMessages.hasNext) return;

    await result.fetchMore({
      variables: {
        input: {
          ...input,
          skip: data.viewMessages.messages?.length ?? 0,
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

  return {...result, messages, fetchMore};
};

export const useUpdateViewMessages = (input: ViewMessagesInput) => {
  const client = useApolloClient();

  const getPrevData = () => {
    const data = client.readQuery<ViewMessagesQuery, QueryViewMessagesArgs>({
      query: VIEW_MESSAGES,
      variables: {input},
    });

    const messages =
      getFragmentData(MESSAGE_BASE, data?.viewMessages.messages) ?? [];
    return messages;
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

  const updateFragmentFn = (
    id: string,
    updateMessage: Partial<MessageBaseFragment>,
  ) => {
    client.cache.updateFragment(
      {
        id: `MessageObjectType:${id}`,
        fragment: MESSAGE_BASE,
      },
      prev =>
        prev && {
          ...prev,
          ...updateMessage,
        },
    );
  };

  const updateMessage = (
    id: string,
    newMessage: Partial<MessageBaseFragment>,
  ) => {
    updateFragmentFn(id, newMessage);
  };

  const updateMessages = (
    newMessages: Array<
      Pick<MessageBaseFragment, 'id'> &
        Omit<Partial<MessageBaseFragment>, 'id' | '__typename'>
    >,
  ) => {
    newMessages.forEach(newMessage => {
      updateFragmentFn(newMessage.id, newMessage);
    });
  };

  const appendMessage = (newMessage: FragmentType<typeof MESSAGE_BASE>) => {
    const messages = getPrevData();
    const newMessageData = getFragmentData(MESSAGE_BASE, newMessage);
    const updateMessages = [...messages, newMessageData];
    updateFn(updateMessages);
  };

  return {updateMessage, updateMessages, appendMessage};
};

export default useViewMessages;
