import {graphql} from '../__generated__';

export const MESSAGE_BASE = graphql(`
  fragment MessageBase on MessageObjectType {
    id
    contents
    type
    readUsersId
    user {
      id
      nickname
      profileUrl
    }
    createdAt
  }
`);
