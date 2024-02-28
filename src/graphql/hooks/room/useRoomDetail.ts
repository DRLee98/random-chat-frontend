import {gql, useQuery} from '@apollo/client';

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
        pinned
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

const useRoomDetail = (input: RoomDetailInput) => {
  return useQuery<RoomDetailQuery, QueryRoomDetailArgs>(ROOM_DETAIL, {
    variables: {input},
  });
};

export default useRoomDetail;
