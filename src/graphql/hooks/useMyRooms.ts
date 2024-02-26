import useCustomLazyQuery from '../utils/useCustomLazyQuery';
import {gql} from '@apollo/client';
import {MY_ROOM_BASE} from '../fragments/room';

import type {MyRoomsQuery, QueryMyRoomsArgs} from '../types/graphql';

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

const useMyRooms = () => {
  return useCustomLazyQuery<MyRoomsQuery, QueryMyRoomsArgs>(MY_ROOMS);
};

export default useMyRooms;
