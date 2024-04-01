import {useMutation} from '@apollo/client';
import {graphql} from '@app/graphql/__generated__';

import type {MutationHookOptions} from '@apollo/client';
import type {CreateRandomRoomMutation} from '@app/graphql/__generated__/graphql';

const CREATE_RANDOM_ROOM = graphql(`
  mutation createRandomRoom {
    createRandomRoom {
      ok
      error
      room {
        ...MyRoomBase
      }
    }
  }
`);

const useCreateRandomRoom = (
  options?: MutationHookOptions<CreateRandomRoomMutation>,
) => {
  return useMutation<CreateRandomRoomMutation>(CREATE_RANDOM_ROOM, options);
};

export default useCreateRandomRoom;
