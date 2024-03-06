import {gql, useQuery} from '@apollo/client';

import type {MeDetailQuery} from '../../types/graphql';

export const ME_DETAIL = gql`
  query meDetail {
    meDetail {
      ok
      error
      me {
        id
        nickname
        profileUrl
        bio
        socialPlatform
        allowMessage
        language
        autoTranslation
        blockUsers {
          id
          nickname
          profileUrl
        }
      }
    }
  }
`;

const useMeDetail = () => {
  const {data, ...rest} = useQuery<MeDetailQuery>(ME_DETAIL);

  return {me: data?.meDetail?.me, ...rest};
};

export default useMeDetail;
