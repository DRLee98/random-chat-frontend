import {useSubscription} from '@apollo/client';
import {graphql} from '@app/graphql/__generated__';

import type {UpdateInviteStatusSubscription} from '@app/graphql/__generated__/graphql';
import type {SubscriptionHookOptions} from '@apollo/client';

const UPDATE_INVITE_STATUS = graphql(`
  subscription updateInviteStatus {
    updateInviteStatus {
      roomId
      id
      status
    }
  }
`);

const useUpdateInviteStatusListener = (
  options?: SubscriptionHookOptions<UpdateInviteStatusSubscription>,
) => {
  return useSubscription<UpdateInviteStatusSubscription>(
    UPDATE_INVITE_STATUS,
    options,
  );
};

export default useUpdateInviteStatusListener;
