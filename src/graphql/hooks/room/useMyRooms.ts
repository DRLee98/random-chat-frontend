import {useApolloClient, useQuery} from '@apollo/client';
import {getFragmentData, graphql} from '@app/graphql/__generated__';

import {MY_ROOM_BASE} from '@app/graphql/fragments/room';

import {dateStringToNumber} from '@app/utils/functions';

import type {QueryHookOptions} from '@apollo/client';
import type {
  MyRoom,
  MyRoomBaseFragment,
  MyRoomsInput,
  MyRoomsQuery,
  QueryMyRoomsArgs,
} from '@app/graphql/__generated__/graphql';
import type {FragmentType} from '@app/graphql/__generated__';

export const MY_ROOMS = graphql(`
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
`);

const useMyRooms = (
  input?: MyRoomsInput,
  options?: Omit<QueryHookOptions<MyRoomsQuery, QueryMyRoomsArgs>, 'variables'>,
) => {
  const {data, ...result} = useQuery<MyRoomsQuery, QueryMyRoomsArgs>(MY_ROOMS, {
    ...options,
    variables: {input: input ?? {}},
  });

  const rooms = getFragmentData(MY_ROOM_BASE, data?.myRooms.rooms) ?? [];

  const fetchMore = async () => {
    if (result.networkStatus !== 7) return;
    if (!data?.myRooms.hasNext) return;

    await result.fetchMore({
      variables: {
        input: {
          ...input,
          skip: data.myRooms.rooms?.length ?? 0,
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

  return {...result, rooms, fetchMore};
};

export const useUpdateMyRooms = (input?: MyRoomsInput) => {
  const client = useApolloClient();

  const getPrevData = () => {
    const data = client.cache.readQuery<MyRoomsQuery, QueryMyRoomsArgs>({
      query: MY_ROOMS,
      variables: {input: input ?? {}},
    });

    const rooms = getFragmentData(MY_ROOM_BASE, data?.myRooms.rooms) ?? [];
    return rooms;
  };

  const updateFn = (rooms: MyRoomBaseFragment[]) => {
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
    newUserRoom: Partial<Omit<MyRoom, 'room'>>,
    newRoom?: Partial<MyRoom['room']>,
  ) => {
    client.cache.updateFragment(
      {
        id: client.cache.identify({__typename: 'MyRoom', id}),
        fragment: MY_ROOM_BASE,
      },
      prev =>
        prev && {
          ...prev,
          ...newUserRoom,
          ...(newRoom && {room: {...prev.room, ...newRoom}}),
        },
    );
  };

  const appendMyRoom = (newRoom: FragmentType<typeof MY_ROOM_BASE>) => {
    const rooms = getPrevData();
    const newRoomData = getFragmentData(MY_ROOM_BASE, newRoom);
    const updateRooms = [...rooms, newRoomData];
    updateFn(updateRooms);
  };

  const removeMyRoom = (id: string) => {
    const rooms = getPrevData();
    const updateRooms = rooms?.filter(({room}) => room.id !== id) ?? [];
    updateFn(updateRooms);
  };

  const sortMyRooms = () => {
    const rooms = getPrevData();
    const updateRooms = [...(rooms ?? [])]
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
      });
    updateFn(updateRooms);
  };

  return {updateMyRoom, appendMyRoom, removeMyRoom, sortMyRooms};
};

export default useMyRooms;
