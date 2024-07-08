import {graphql} from '../__generated__';

export const INVITE_ROOM_BASE = graphql(`
  fragment InviteRoomBase on InviteRoom {
    id
    createdAt
    updatedAt
    invites {
      id
      status
      createdAt
      updatedAt
      user {
        id
        nickname
        profileUrl
        profileBgColor
        profileTextColor
      }
    }
  }
`);
