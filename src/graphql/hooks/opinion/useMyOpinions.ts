import {useApolloClient, useQuery} from '@apollo/client';
import {graphql} from '@app/graphql/__generated__';

import type {QueryHookOptions} from '@apollo/client';
import type {
  MyOpinionsInput,
  MyOpinionsQuery,
  QueryMyOpinionsArgs,
} from '@app/graphql/__generated__/graphql';
import type {RequiredItem} from 'types/utils';

export type Opinion = RequiredItem<MyOpinionsQuery['myOpinions'], 'opinions'>;

export const MY_OPINIONS = graphql(`
  query myOpinions($input: MyOpinionsInput!) {
    myOpinions(input: $input) {
      ok
      error
      hasNext
      opinions {
        id
        title
        category
        status
        createdAt
        updatedAt
      }
    }
  }
`);

const useMyOpinions = (
  input?: MyOpinionsInput,
  options?: Omit<
    QueryHookOptions<MyOpinionsQuery, QueryMyOpinionsArgs>,
    'variables'
  >,
) => {
  const {data, ...result} = useQuery<MyOpinionsQuery, QueryMyOpinionsArgs>(
    MY_OPINIONS,
    {
      ...options,
      variables: {input: input ?? {}},
    },
  );

  const opinions = data?.myOpinions.opinions ?? [];

  const fetchMore = async () => {
    if (result.networkStatus !== 7) return;
    if (!data?.myOpinions.hasNext) return;

    await result.fetchMore({
      variables: {
        input: {
          ...input,
          skip: data.myOpinions.opinions?.length ?? 0,
        },
      },
      updateQuery: (prev, {fetchMoreResult}) => {
        if (!prev.myOpinions.opinions) return prev;
        if (!fetchMoreResult.myOpinions.opinions) return prev;
        return {
          myOpinions: {
            ...fetchMoreResult.myOpinions,
            opinions: [
              ...prev.myOpinions.opinions,
              ...fetchMoreResult.myOpinions.opinions,
            ],
          },
        };
      },
    });
  };

  const refetch = async () =>
    result.refetch({input: {...input, take: opinions.length, skip: 0}});

  return {
    ...result,
    opinions,
    fetchMore,
    refetch,
    hasNext: data?.myOpinions.hasNext ?? false,
  };
};

export const useUpdateMyOpinions = (input?: MyOpinionsInput) => {
  const client = useApolloClient();

  const getPrevData = () => {
    const data = client.cache.readQuery<MyOpinionsQuery, QueryMyOpinionsArgs>({
      query: MY_OPINIONS,
      variables: {input: input ?? {}},
    });

    const opinions = data?.myOpinions.opinions ?? [];
    return opinions;
  };

  const updateFn = (opinions: Opinion[]) => {
    client.cache.updateQuery<MyOpinionsQuery, QueryMyOpinionsArgs>(
      {query: MY_OPINIONS, variables: {input: input ?? {}}},
      prev =>
        prev?.myOpinions && {
          ...prev,
          myOpinions: {
            ...prev.myOpinions,
            opinions,
          },
        },
    );
  };

  const updateMyOpinion = (id: string, newOpinion?: Partial<Opinion>) => {
    const opinions = getPrevData();
    const updateOpinions = opinions.map(opinion => {
      if (opinion.id === id) {
        return {...opinion, ...newOpinion};
      }
      return opinion;
    });
    updateFn(updateOpinions);
  };

  const appendMyOpinion = (newOpinion: Opinion) => {
    const opinions = getPrevData();
    const updateOpinions = [newOpinion, ...opinions];
    updateFn(updateOpinions);
  };

  const removeMyOpinion = (id: string) => {
    const opinions = getPrevData();
    const updateOpinions = opinions?.filter(opinion => opinion.id !== id) ?? [];
    updateFn(updateOpinions);
  };

  return {updateMyOpinion, appendMyOpinion, removeMyOpinion};
};

export default useMyOpinions;
