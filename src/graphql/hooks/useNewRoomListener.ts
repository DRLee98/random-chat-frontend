import {gql, useSubscription} from '@apollo/client';

import type {UserRoomObjectType} from '../types/graphql';
import type {SubscriptionHookOptions} from '@apollo/client';

const NEW_ROOM = gql`
  subscription newRoom {
    newRoom {
      id
      name
      noti
      pinned
      newMessage
    }
  }
`;

interface Options extends SubscriptionHookOptions<UserRoomObjectType> {}

const useNewRoomListener = (optiosn: Options) => {
  return useSubscription<UserRoomObjectType>(NEW_ROOM, optiosn);
};

export default useNewRoomListener;
