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
      currentPage
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
  const result = useQuery<MyRoomsQuery, QueryMyRoomsArgs>(MY_ROOMS, {
    variables: {input},
  });

  const fetchMore = () => {
    if (result.loading) return;
    if (!result.data?.myRooms.hasNextPage) return;

    const nextPage = (result.data.myRooms?.currentPage ?? 1) + 1;

    result.fetchMore({
      variables: {
        input: {
          ...input,
          page: nextPage,
        },
      },
      updateQuery: (prev, {fetchMoreResult}) => {
        if (!prev.myRooms.rooms) return prev;
        if (!fetchMoreResult.myRooms.rooms) return prev;
        return {
          myRooms: {
            ...fetchMoreResult.myRooms,
            rooms: [
              ...prev.myRooms.rooms,
              ...fetchMoreResult.myRooms.rooms,
            ].filter(
              (item, index, list) =>
                list.findIndex(({id}) => id === item.id) === index,
            ),
          },
        };
      },
    });
  };

  return {...result, fetchMore};
};

export default useMyRooms;
