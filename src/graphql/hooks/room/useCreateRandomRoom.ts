import {gql, useMutation} from '@apollo/client';
import {MY_ROOM_BASE} from '../../fragments/room';

import type {MutationHookOptions} from '@apollo/client';
import type {CreateRandomRoomMutation} from '../../types/graphql';

const CREATE_RANDOM_ROOM = gql`
  mutation createRandomRoom {
    createRandomRoom {
      ok
      error
      room {
        ...MyRoomBase
      }
    }
  }
  ${MY_ROOM_BASE}
`;

const useCreateRandomRoom = (
  options?: MutationHookOptions<CreateRandomRoomMutation>,
) => {
  return useMutation<CreateRandomRoomMutation>(CREATE_RANDOM_ROOM, options);
};

export default useCreateRandomRoom;
