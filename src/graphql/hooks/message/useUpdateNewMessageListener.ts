import {useSubscription} from '@apollo/client';
import {graphql} from '@app/graphql/__generated__';

import type {UpdateNewMessageInUserRoomSubscription} from '@app/graphql/__generated__/graphql';
import type {SubscriptionHookOptions} from '@apollo/client';

const UPDATE_NEW_MESSAGE = graphql(`
  subscription updateNewMessageInUserRoom {
    updateNewMessageInUserRoom {
      id
      newMessage
      lastMessage
      userId
    }
  }
`);

const useUpdateNewMessageListener = (
  options?: SubscriptionHookOptions<UpdateNewMessageInUserRoomSubscription>,
) => {
  return useSubscription<UpdateNewMessageInUserRoomSubscription>(
    UPDATE_NEW_MESSAGE,
    options,
  );
};

export default useUpdateNewMessageListener;
