import {gql, useQuery} from '@apollo/client';

import type {QueryHookOptions} from '@apollo/client';
import type {
  QueryRoomDetailArgs,
  RoomDetailInput,
  RoomDetailQuery,
} from '../../types/graphql';

const ROOM_DETAIL = gql`
  query roomDetail($input: RoomDetailInput!) {
    roomDetail(input: $input) {
      ok
      error
      room {
        id
        name
        noti
        pinnedAt
        newMessage
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

export default useRoomDetail;
