import {graphql} from '../__generated__';

export const OPINION_BASE = graphql(`
  fragment OpinionBase on OpinionObjectType {
    id
    title
    content
    imageUrls
    category
    status
    createdAt
    updatedAt
  }
`);
