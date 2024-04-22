import {graphql} from '../__generated__';

export const NOTIFICATION_BASE = graphql(`
  fragment NotificationBase on NotificationObjectType {
    id
    title
    message
    read
    type
    data
    createdAt
  }
`);
