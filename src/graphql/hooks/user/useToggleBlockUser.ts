import {gql, useApolloClient, useMutation} from '@apollo/client';

import {ME} from './useMe';
import {ME_DETAIL} from './useMeDetail';

import type {MutationHookOptions} from '@apollo/client';
import type {
  ToggleBlockUserMutation,
  MutationToggleBlockUserArgs,
  MeDetailQuery,
  MeQuery,
} from '@app/graphql/types/graphql';

const TOGGLE_BLOCK_USER = gql`
  mutation toggleBlockUser($input: ToggleBlockUserInput!) {
    toggleBlockUser(input: $input) {
      ok
      error
      updateBlockUsers {
        id
        nickname
        profileUrl
      }
    }
  }
`;

const useToggleBlockUser = (
  options?: MutationHookOptions<
    ToggleBlockUserMutation,
    MutationToggleBlockUserArgs
  >,
) => {
  const {cache} = useApolloClient();

  const onCompleted = (data: ToggleBlockUserMutation) => {
    if (!data.toggleBlockUser.ok) return;
    cache.updateQuery<MeDetailQuery>(
      {query: ME_DETAIL},
      prev =>
        prev?.meDetail.me && {
          ...prev,
          meDetail: {
            ...prev.meDetail,
            me: {
              ...prev.meDetail.me,
              blockUsers:
                data?.toggleBlockUser.updateBlockUsers ??
                prev.meDetail.me?.blockUsers,
            },
          },
        },
    );
    cache.updateQuery<MeQuery>(
      {query: ME},
      prev =>
        prev && {
          ...prev,
          me: {
            ...prev.me,
            ...(prev.me.me && {
              me: {
                ...prev.me.me,
                blockUserIds:
                  data?.toggleBlockUser.updateBlockUsers?.map(
                    user => +user.id,
                  ) ?? prev.me.me.blockUserIds,
              },
            }),
          },
        },
    );
    options?.onCompleted?.(data);
  };

  return useMutation<ToggleBlockUserMutation, MutationToggleBlockUserArgs>(
    TOGGLE_BLOCK_USER,
    {...options, onCompleted},
  );
};

export default useToggleBlockUser;
