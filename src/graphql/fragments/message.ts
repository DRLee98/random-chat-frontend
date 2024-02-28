import {gql} from '@apollo/client';

export const MESSAGE_BASE = gql`
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
  }
`;
