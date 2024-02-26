import {gql} from '@apollo/client';

export const USER_ROOM_BASE = gql`
  fragment UserRoomBase on UserRoomObjectType {
    id
    name
    noti
    pinned
    newMessage
    room {
      id
    }
  }
`;

export const MY_ROOM_BASE = gql`
  fragment MyRoomBase on MyRoom {
    id
    name
    noti
    pinned
    newMessage
    lastMessage
    room {
      id
    }
    users {
      profileUrl
    }
  }
`;
