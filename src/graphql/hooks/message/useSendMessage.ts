import {useMutation} from '@apollo/client';
import {graphql} from '@app/graphql/__generated__';

import type {MutationHookOptions} from '@apollo/client';
import type {
  MutationSendMessageArgs,
  SendMessageMutation,
} from '@app/graphql/__generated__/graphql';

const SEND_MESSAGE = graphql(`
  mutation sendMessage($input: SendMessageInput!) {
    sendMessage(input: $input) {
      ok
      error
      message {
        ...MessageBase
      }
    }
  }
`);

const useSendMessage = (
  options?: MutationHookOptions<SendMessageMutation, MutationSendMessageArgs>,
) => {
  return useMutation<SendMessageMutation, MutationSendMessageArgs>(
    SEND_MESSAGE,
    options,
  );
};

export default useSendMessage;
