import {gql, useMutation} from '@apollo/client';
import {MESSAGE_BASE} from '../../fragments/message';

import type {MutationHookOptions} from '@apollo/client';
import type {
  MutationSendMessageArgs,
  SendMessageMutation,
} from '../../types/graphql';

const SEND_MESSAGE = gql`
  mutation sendMessage($input: SendMessageInput!) {
    sendMessage(input: $input) {
      ok
      error
      message {
        ...MessageBase
      }
    }
  }
  ${MESSAGE_BASE}
`;

const useSendMessage = (
  options?: MutationHookOptions<SendMessageMutation, MutationSendMessageArgs>,
) => {
  return useMutation<SendMessageMutation, MutationSendMessageArgs>(
    SEND_MESSAGE,
    options,
  );
};

export default useSendMessage;
