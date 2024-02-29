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
      hasNext
      rooms {
        ...MyRoomBase
      }
    }
  }
  ${MY_ROOM_BASE}
`;

const useMyRooms = (input: MyRoomsInput) => {
  const result = useQuery<MyRoomsQuery, QueryMyRoomsArgs>(MY_ROOMS, {
    variables: {input},
  });

  const fetchMore = () => {
    if (result.loading) return;
    if (!result.data?.myRooms.hasNext) return;

    result.fetchMore({
      variables: {
        input: {
          ...input,
          skip: result.data.myRooms.rooms?.length ?? 0,
        },
      },
      updateQuery: (prev, {fetchMoreResult}) => {
        if (!prev.myRooms.rooms) return prev;
        if (!fetchMoreResult.myRooms.rooms) return prev;
        return {
          myRooms: {
            ...fetchMoreResult.myRooms,
            rooms: [...prev.myRooms.rooms, ...fetchMoreResult.myRooms.rooms],
          },
        };
      },
    });
  };

  return {...result, fetchMore};
};

export default useMyRooms;
