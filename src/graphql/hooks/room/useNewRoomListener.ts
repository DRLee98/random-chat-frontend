import {gql, useSubscription} from '@apollo/client';
import {MY_ROOM_BASE} from '../../fragments/room';

import type {MyRoom} from '../../types/graphql';
import type {SubscriptionHookOptions} from '@apollo/client';

const NEW_ROOM = gql`
  subscription newRoom {
    newRoom {
      ...MyRoomBase
    }
  }
  ${MY_ROOM_BASE}
`;

interface Options extends SubscriptionHookOptions<MyRoom> {}

const useNewRoomListener = (options: Options) => {
  return useSubscription<MyRoom>(NEW_ROOM, options);
};

export default useNewRoomListener;
