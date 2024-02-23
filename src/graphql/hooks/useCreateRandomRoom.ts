import {gql, useMutation} from '@apollo/client';
import {CreateRandomRoomMutation} from '../types/graphql';

const CREATE_RANDOM_ROOM = gql`
  mutation createRandomRoom {
    createRandomRoom {
      ok
      error
      room {
        id
      }
    }
  }
`;

const useCreateRandomRoom = () => {
  return useMutation<CreateRandomRoomMutation>(CREATE_RANDOM_ROOM);
};

export default useCreateRandomRoom;
