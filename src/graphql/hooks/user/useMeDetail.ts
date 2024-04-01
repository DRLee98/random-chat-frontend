import {useQuery} from '@apollo/client';
import {graphql} from '@app/graphql/__generated__';

import type {QueryHookOptions} from '@apollo/client';
import type {MeDetailQuery} from '@app/graphql/__generated__/graphql';

export const ME_DETAIL = graphql(`
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
`);

const useMeDetail = (options?: QueryHookOptions<MeDetailQuery>) => {
  const {data, ...rest} = useQuery<MeDetailQuery>(ME_DETAIL, options);

  return {me: data?.meDetail?.me, ...rest};
};

export default useMeDetail;
