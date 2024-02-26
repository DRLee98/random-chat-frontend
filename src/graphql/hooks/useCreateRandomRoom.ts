import {gql, useMutation} from '@apollo/client';
import {MY_ROOM_BASE} from '../fragments/room';

import type {CreateRandomRoomMutation} from '../types/graphql';

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

const useCreateRandomRoom = () => {
  return useMutation<CreateRandomRoomMutation>(CREATE_RANDOM_ROOM);
};

export default useCreateRandomRoom;
