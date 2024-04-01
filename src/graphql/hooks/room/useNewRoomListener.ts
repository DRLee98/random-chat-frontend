import {useSubscription} from '@apollo/client';
import {graphql} from '@app/graphql/__generated__';

import type {NewRoomSubscription} from '@app/graphql/__generated__/graphql';
import type {SubscriptionHookOptions} from '@apollo/client';

const NEW_ROOM = graphql(`
  subscription newRoom {
    newRoom {
      ...MyRoomBase
    }
  }
`);

const useNewRoomListener = (
  options?: SubscriptionHookOptions<NewRoomSubscription>,
) => {
  return useSubscription<NewRoomSubscription>(NEW_ROOM, options);
};

export default useNewRoomListener;
