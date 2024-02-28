import {gql, useSubscription} from '@apollo/client';

import type {UpdateNewMessageInUserRoom} from '../../types/graphql';
import type {SubscriptionHookOptions} from '@apollo/client';

const UPDATE_NEW_MESSAGE = gql`
  subscription updateNewMessageInUserRoom {
    updateNewMessageInUserRoom {
      id
      newMessage
      lastMessage
      userId
    }
  }
`;

interface Options extends SubscriptionHookOptions<UpdateNewMessageInUserRoom> {}

const useUpdateNewMessageListener = (options: Options) => {
  return useSubscription<UpdateNewMessageInUserRoom>(
    UPDATE_NEW_MESSAGE,
    options,
  );
};

export default useUpdateNewMessageListener;
