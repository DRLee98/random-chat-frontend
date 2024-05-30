import {graphql} from '../__generated__';

export const COMMENT_BASE = graphql(`
  fragment CommentBase on CommentObjectType {
    id
    text
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
`);
