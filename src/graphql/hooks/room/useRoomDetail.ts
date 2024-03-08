import {gql, useApolloClient, useQuery} from '@apollo/client';

import type {QueryHookOptions} from '@apollo/client';
import type {
  QueryRoomDetailArgs,
  RoomDetailInput,
  RoomDetailQuery,
  SimpleUserRoom,
} from '../../types/graphql';

const ROOM_DETAIL = gql`
  query roomDetail($input: RoomDetailInput!) {
    roomDetail(input: $input) {
      ok
      error
      room {
        userRoom {
          id
          name
          noti
          pinnedAt
          newMessage
        }
        users {
          id
          nickname
          profileUrl
          bio
          language
        }
      }
    }
  }
`;

const useRoomDetail = (
  input: RoomDetailInput,
  options?: Omit<
    QueryHookOptions<RoomDetailQuery, QueryRoomDetailArgs>,
    'variables'
  >,
) => {
  return useQuery<RoomDetailQuery, QueryRoomDetailArgs>(ROOM_DETAIL, {
    ...options,
    variables: {input},
  });
};

export const useUpdateRoomDetail = (input: RoomDetailInput) => {
  const client = useApolloClient();

  const updateRoomDetail = (newUserRoom: Partial<SimpleUserRoom>) => {
    client.cache.updateQuery<RoomDetailQuery, QueryRoomDetailArgs>(
      {query: ROOM_DETAIL, variables: {input}},
      prev =>
        prev?.roomDetail.room && {
          ...prev,
          roomDetail: {
            ...prev.roomDetail,
            room: {
              ...prev.roomDetail.room,
              userRoom: {
                ...prev.roomDetail.room.userRoom,
                ...newUserRoom,
              },
            },
          },
        },
    );
  };

  return {updateRoomDetail};
};

export default useRoomDetail;
