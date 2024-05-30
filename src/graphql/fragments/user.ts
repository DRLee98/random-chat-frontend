import {graphql} from '../__generated__';

export const BLOCK_USER = graphql(`
  fragment BlockUser on UserObjectType {
    id
    nickname
    profileUrl
    profileBgColor
    profileTextColor
    bio
  }
`);
