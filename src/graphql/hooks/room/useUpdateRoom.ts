import {useMutation} from '@apollo/client';
import {graphql} from '@app/graphql/__generated__';

import type {MutationHookOptions} from '@apollo/client';
import type {
  UpdateRoomMutation,
  MutationUpdateRoomArgs,
} from '@app/graphql/__generated__/graphql';

const UPDATE_ROOM = graphql(`
  mutation updateRoom($input: UpdateRoomInput!) {
    updateRoom(input: $input) {
      ok
      error
    }
  }
`);

const useUpdateRoom = (
  options?: MutationHookOptions<UpdateRoomMutation, MutationUpdateRoomArgs>,
) => {
  return useMutation<UpdateRoomMutation, MutationUpdateRoomArgs>(
    UPDATE_ROOM,
    options,
  );
};

export default useUpdateRoom;
