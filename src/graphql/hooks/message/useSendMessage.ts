import {gql, useMutation} from '@apollo/client';
import type {
  MutationSendMessageArgs,
  SendMessageMutation,
} from '../../types/graphql';

const SEND_MESSAGE = gql`
  mutation sendMessage($input: SendMessageInput!) {
    sendMessage(input: $input) {
      ok
      error
      messageId
    }
  }
`;

const useSendMessage = () => {
  return useMutation<SendMessageMutation, MutationSendMessageArgs>(
    SEND_MESSAGE,
  );
};

export default useSendMessage;
