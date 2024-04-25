import {QueryHookOptions, useQuery} from '@apollo/client';
import {getFragmentData, graphql} from '@app/graphql/__generated__';

import {OPINION_BASE} from '@app/graphql/fragments/opinion';

import type {
  OpinionDetailInput,
  OpinionDetailQuery,
  QueryOpinionDetailArgs,
} from '@app/graphql/__generated__/graphql';

export const OPINION_DETAIL = graphql(`
  query opinionDetail($input: OpinionDetailInput!) {
    opinionDetail(input: $input) {
      ok
      error
      opinion {
        ...OpinionBase
      }
    }
  }
`);

const useOpinionDetail = (
  input: OpinionDetailInput,
  options?: Omit<
    QueryHookOptions<OpinionDetailQuery, QueryOpinionDetailArgs>,
    'variables'
  >,
) => {
  const {data, ...result} = useQuery<
    OpinionDetailQuery,
    QueryOpinionDetailArgs
  >(OPINION_DETAIL, {
    ...options,
    variables: {input},
  });

  const opinion = getFragmentData(OPINION_BASE, data?.opinionDetail.opinion);

  return {opinion, ...result};
};

export default useOpinionDetail;
