import {gql, useSubscription} from '@apollo/client';

import type {UpdateNewMessageInUserRoomSubscription} from '../../types/graphql';
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

interface Options
  extends SubscriptionHookOptions<UpdateNewMessageInUserRoomSubscription> {}

const useUpdateNewMessageListener = (options: Options) => {
  return useSubscription<UpdateNewMessageInUserRoomSubscription>(
    UPDATE_NEW_MESSAGE,
    options,
  );
};

export default useUpdateNewMessageListener;
