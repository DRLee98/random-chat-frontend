import {graphql} from '../__generated__';

export const REPLY_BASE = graphql(`
  fragment ReplyBase on ReplyObjectType {
    id
    text
    createdAt
    updatedAt
    user {
      id
      nickname
      profileUrl
    }
  }
`);
