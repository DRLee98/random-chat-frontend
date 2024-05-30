import {graphql} from '../__generated__';

export const USER_ROOM_BASE = graphql(`
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
`);

export const MY_ROOM_BASE = graphql(`
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
      id
      nickname
      profileUrl
      profileBgColor
      profileTextColor
    }
    updatedAt
  }
`);
