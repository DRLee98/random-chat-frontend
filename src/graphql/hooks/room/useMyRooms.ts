import {gql, useQuery} from '@apollo/client';
import {MY_ROOM_BASE} from '../../fragments/room';

import type {
  MyRoomsInput,
  MyRoomsQuery,
  QueryMyRoomsArgs,
} from '../../types/graphql';

const MY_ROOMS = gql`
  query myRooms($input: MyRoomsInput!) {
    myRooms(input: $input) {
      ok
      error
      totalPages
      hasNextPage
      rooms {
        ...MyRoomBase
      }
    }
  }
  ${MY_ROOM_BASE}
`;

const useMyRooms = (input: MyRoomsInput) => {
  return useQuery<MyRoomsQuery, QueryMyRoomsArgs>(MY_ROOMS, {
    variables: {input},
  });
};

export default useMyRooms;
