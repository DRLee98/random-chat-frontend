import {gql, useSubscription} from '@apollo/client';
import {MY_ROOM_BASE} from '../../fragments/room';

import type {NewRoomSubscription} from '../../types/graphql';
import type {SubscriptionHookOptions} from '@apollo/client';

const NEW_ROOM = gql`
  subscription newRoom {
    newRoom {
      ...MyRoomBase
    }
  }
  ${MY_ROOM_BASE}
`;

interface Options extends SubscriptionHookOptions<NewRoomSubscription> {}

const useNewRoomListener = (options: Options) => {
  return useSubscription<NewRoomSubscription>(NEW_ROOM, options);
};

export default useNewRoomListener;
