import {useApolloClient, useQuery} from '@apollo/client';
import {graphql} from '@app/graphql/__generated__';

import type {QueryHookOptions} from '@apollo/client';
import type {MeDetail, MeDetailQuery} from '@app/graphql/__generated__/graphql';

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
        noti
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

export const useUpdateMeDetail = () => {
  const client = useApolloClient();

  const updateFn = (data: Partial<MeDetail>) => {
    client.cache.updateQuery<MeDetailQuery>(
      {
        query: ME_DETAIL,
      },
      prev =>
        prev?.meDetail.me && {
          ...prev,
          meDetail: {
            ...prev.meDetail,
            me: {
              ...prev.meDetail.me,
              ...data,
            },
          },
        },
    );
  };

  return updateFn;
};

export default useMeDetail;
