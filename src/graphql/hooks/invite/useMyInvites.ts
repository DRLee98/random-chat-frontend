import {useApolloClient, useQuery} from '@apollo/client';
import {getFragmentData, graphql} from '@app/graphql/__generated__';

import {INVITE_ROOM_BASE} from '@app/graphql/fragments/invite';
import {InviteStatus} from '@app/graphql/__generated__/graphql';

import type {QueryHookOptions} from '@apollo/client';
import type {
  InviteRoomBaseFragment,
  MyInvitesQuery,
} from '@app/graphql/__generated__/graphql';
import type {FragmentType} from '@app/graphql/__generated__';

export const MY_INVITES = graphql(`
  query myInvites {
    myInvites {
      ok
      error
      rooms {
        ...InviteRoomBase
      }
    }
  }
`);

const useMyInvites = (
  options?: Omit<QueryHookOptions<MyInvitesQuery>, 'variables'>,
) => {
  const {data, ...result} = useQuery<MyInvitesQuery>(MY_INVITES, {
    ...options,
  });

  const inviteRooms =
    getFragmentData(INVITE_ROOM_BASE, data?.myInvites.rooms) ?? [];

  return {inviteRooms, ...result};
};

export const useUpdateMyInvites = () => {
  const client = useApolloClient();

  const getPrevData = () => {
    const data = client.cache.readQuery<MyInvitesQuery>({
      query: MY_INVITES,
    });

    const rooms =
      getFragmentData(INVITE_ROOM_BASE, data?.myInvites.rooms) ?? [];
    return rooms;
  };

  const updateFn = (rooms: InviteRoomBaseFragment[]) => {
    client.cache.updateQuery<MyInvitesQuery>(
      {query: MY_INVITES},
      prev =>
        prev?.myInvites && {
          ...prev,
          myInvites: {
            ...prev.myInvites,
            rooms,
          },
        },
    );
  };

  const updateMyInviteStatus = (
    roomId: string,
    inviteId: string,
    status: InviteStatus,
  ) => {
    client.cache.updateFragment(
      {
        id: client.cache.identify({__typename: 'InviteRoom', id: roomId}),
        fragment: INVITE_ROOM_BASE,
      },
      prev => {
        if (prev?.invites) {
          const updateInvites = prev.invites.map(item => {
            if (item.id === inviteId) {
              return {
                ...item,
                status,
              };
            }
            return item;
          });
          const waitInviteCount = updateInvites.filter(
            item => item.status === InviteStatus.Wait,
          ).length;
          if (waitInviteCount === 0) {
            removeMyInvite(roomId);
          }
          return {
            ...prev,
            invites: updateInvites,
          };
        }
        return null;
      },
    );
  };

  const appendMyInvite = (newRoom: FragmentType<typeof INVITE_ROOM_BASE>) => {
    const rooms = getPrevData();
    const newRoomData = getFragmentData(INVITE_ROOM_BASE, newRoom);
    const updateRooms = [newRoomData, ...rooms];
    updateFn(updateRooms);
  };

  const removeMyInvite = (id: string) => {
    const rooms = getPrevData();
    const updateRooms = rooms?.filter(room => room.id !== id) ?? [];
    updateFn(updateRooms);
  };

  return {updateMyInviteStatus, appendMyInvite, removeMyInvite};
};

export default useMyInvites;
