import {gql, useQuery} from '@apollo/client';

import type {QueryHookOptions} from '@apollo/client';
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

const useMeDetail = (options?: QueryHookOptions<MeDetailQuery>) => {
  const {data, ...rest} = useQuery<MeDetailQuery>(ME_DETAIL, options);

  return {me: data?.meDetail?.me, ...rest};
};

export default useMeDetail;
