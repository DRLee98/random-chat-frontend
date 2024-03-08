import {gql} from '@apollo/client';

export const USER_ROOM_BASE = gql`
  fragment UserRoomBase on UserRoomObjectType {
    id
    name
    noti
    pinnedAt
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
    pinnedAt
    newMessage
    lastMessage
    room {
      id
      updatedAt
    }
    users {
      profileUrl
    }
    updatedAt
  }
`;
