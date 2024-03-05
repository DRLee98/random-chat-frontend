import {gql, useMutation} from '@apollo/client';

import type {
  DeleteRoomMutation,
  MutationDeleteRoomArgs,
} from '../../types/graphql';

const DELETE_ROOM = gql`
  mutation deleteRoom($input: DeleteRoomInput!) {
    deleteRoom(input: $input) {
      ok
      error
    }
  }
`;

const useDeleteRoom = () => {
  return useMutation<DeleteRoomMutation, MutationDeleteRoomArgs>(DELETE_ROOM);
};

export default useDeleteRoom;
