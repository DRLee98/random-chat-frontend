import {QueryHookOptions, useQuery} from '@apollo/client';
import {graphql} from '@app/graphql/__generated__';

import type {
  NoticeListInput,
  NoticeListQuery,
  QueryNoticeListArgs,
} from '@app/graphql/__generated__/graphql';

export const NOTICE_LIST = graphql(`
  query noticeList($input: NoticeListInput!) {
    noticeList(input: $input) {
      ok
      error
      hasNext
      noticeList {
        id
        title
        pinned
        createdAt
      }
    }
  }
`);

const useNoticeList = (
  input?: NoticeListInput,
  options?: Omit<
    QueryHookOptions<NoticeListQuery, QueryNoticeListArgs>,
    'variables'
  >,
) => {
  const {data, ...result} = useQuery<NoticeListQuery, QueryNoticeListArgs>(
    NOTICE_LIST,
    {
      ...options,
      variables: {input: input ?? {}},
    },
  );

  const fetchMore = async () => {
    if (result.networkStatus !== 7) return;
    if (!data?.noticeList.hasNext) return;

    await result.fetchMore({
      variables: {
        input: {
          ...input,
          skip: data.noticeList.noticeList?.length ?? 0,
        },
      },
      updateQuery: (prev, {fetchMoreResult}) => {
        if (!prev.noticeList.noticeList) return prev;
        if (!fetchMoreResult.noticeList.noticeList) return prev;
        return {
          noticeList: {
            ...fetchMoreResult.noticeList,
            noticeList: [
              ...prev.noticeList.noticeList,
              ...fetchMoreResult.noticeList.noticeList,
            ],
          },
        };
      },
    });
  };

  return {...result, fetchMore, noticeList: data?.noticeList.noticeList ?? []};
};

export default useNoticeList;
