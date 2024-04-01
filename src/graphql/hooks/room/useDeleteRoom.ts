import {useMutation} from '@apollo/client';
import {graphql} from '@app/graphql/__generated__';

import type {MutationHookOptions} from '@apollo/client';
import type {
  DeleteRoomMutation,
  MutationDeleteRoomArgs,
} from '@app/graphql/__generated__/graphql';

const DELETE_ROOM = graphql(`
  mutation deleteRoom($input: DeleteRoomInput!) {
    deleteRoom(input: $input) {
      ok
      error
    }
  }
`);

const useDeleteRoom = (
  options?: MutationHookOptions<DeleteRoomMutation, MutationDeleteRoomArgs>,
) => {
  return useMutation<DeleteRoomMutation, MutationDeleteRoomArgs>(
    DELETE_ROOM,
    options,
  );
};

export default useDeleteRoom;
