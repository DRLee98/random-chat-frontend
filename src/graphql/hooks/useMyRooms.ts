import {gql} from '@apollo/client';
import useCustomLazyQuery from './useCustomLazyQuery';
import {MyRoomsQuery, QueryMyRoomsArgs} from '../types/graphql';

const MY_ROOMS = gql`
  query myRooms($input: MyRoomsInput!) {
    myRooms(input: $input) {
      ok
      error
      totalPages
      hasNextPage
      rooms {
        id
        name
        noti
        pinned
        newMessage
        lastMessage
      }
    }
  }
`;

const useMyRooms = () => {
  return useCustomLazyQuery<MyRoomsQuery, QueryMyRoomsArgs>(MY_ROOMS);
};

export default useMyRooms;
