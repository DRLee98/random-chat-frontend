import {gql, useMutation} from '@apollo/client';

import type {MutationHookOptions} from '@apollo/client';
import type {
  UpdateRoomMutation,
  MutationUpdateRoomArgs,
} from '../../types/graphql';

const UPDATE_ROOM = gql`
  mutation updateRoom($input: UpdateRoomInput!) {
    updateRoom(input: $input) {
      ok
      error
    }
  }
`;

const useUpdateRoom = (
  options?: MutationHookOptions<UpdateRoomMutation, MutationUpdateRoomArgs>,
) => {
  return useMutation<UpdateRoomMutation, MutationUpdateRoomArgs>(
    UPDATE_ROOM,
    options,
  );
};

export default useUpdateRoom;
