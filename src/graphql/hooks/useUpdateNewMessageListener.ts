import {gql, useSubscription} from '@apollo/client';

import type {UpdateNewMessageInUserRoom} from '../types/graphql';
import type {SubscriptionHookOptions} from '@apollo/client';

const NEW_ROOM = gql`
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

const useUpdateNewMessageListener = (optiosn: Options) => {
  return useSubscription<UpdateNewMessageInUserRoom>(NEW_ROOM, optiosn);
};

export default useUpdateNewMessageListener;
