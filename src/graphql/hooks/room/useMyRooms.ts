import {gql, useApolloClient, useQuery} from '@apollo/client';
import {MY_ROOM_BASE} from '../../fragments/room';

import {dateStringToNumber} from '@app/utils/functions';

import type {QueryHookOptions} from '@apollo/client';
import type {
  MyRoom,
  MyRoomsInput,
  MyRoomsQuery,
  QueryMyRoomsArgs,
} from '../../types/graphql';

export const MY_ROOMS = gql`
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

const useMyRooms = (
  input?: MyRoomsInput,
  options?: Omit<QueryHookOptions<MyRoomsQuery, QueryMyRoomsArgs>, 'variables'>,
) => {
  const result = useQuery<MyRoomsQuery, QueryMyRoomsArgs>(MY_ROOMS, {
    ...options,
    variables: {input: input ?? {}},
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

export const useUpdateMyRoom = () => {
  const client = useApolloClient();

  const getPrevData = (input?: MyRoomsInput) => {
    return client.readQuery<MyRoomsQuery, QueryMyRoomsArgs>({
      query: MY_ROOMS,
      variables: {input: input ?? {}},
    });
  };

  const updateFn = (rooms: MyRoom[], input?: MyRoomsInput) => {
    client.cache.updateQuery<MyRoomsQuery, QueryMyRoomsArgs>(
      {query: MY_ROOMS, variables: {input: input ?? {}}},
      prev =>
        prev?.myRooms && {
          ...prev,
          myRooms: {
            ...prev.myRooms,
            rooms,
          },
        },
    );
  };

  const updateMyRoom = (
    id: string,
    newRoom: Partial<MyRoom>,
    input?: MyRoomsInput,
  ) => {
    const prevData = getPrevData(input);
    const updateRooms = (prevData?.myRooms.rooms?.map(room => {
      if (room.id === id) {
        return {...room, ...newRoom};
      }
      return room;
    }) ?? []) as MyRoom[];
    updateFn(updateRooms, input);
  };

  const appendMyRooms = (newRoom: MyRoom, input?: MyRoomsInput) => {
    const prevData = getPrevData(input);
    const updateRooms = [
      newRoom,
      ...(prevData?.myRooms.rooms ?? []),
    ] as MyRoom[];
    updateFn(updateRooms, input);
  };

  const sortMyRooms = (input?: MyRoomsInput) => {
    const prevData = getPrevData(input);
    const updateRooms = [...(prevData?.myRooms.rooms ?? [])]
      .sort(
        (a, b) =>
          dateStringToNumber(b.room.updatedAt) -
          dateStringToNumber(a.room.updatedAt),
      )
      .sort((a, b) => {
        if (a.pinnedAt && b.pinnedAt) {
          return (
            Math.max(
              dateStringToNumber(b.pinnedAt),
              dateStringToNumber(b.room.updatedAt),
            ) -
            Math.max(
              dateStringToNumber(a.pinnedAt),
              dateStringToNumber(a.room.updatedAt),
            )
          );
        }
        if (b.pinnedAt && !a.pinnedAt) return 1;
        if (a.pinnedAt && !b.pinnedAt) return -1;
        return 0;
      }) as MyRoom[];
    updateFn(updateRooms, input);
  };

  return {updateMyRoom, appendMyRooms, sortMyRooms};
};

export default useMyRooms;
