import {gql, useMutation} from '@apollo/client';

import type {MutationHookOptions} from '@apollo/client';
import type {
  ToggleBlockUserMutation,
  MutationToggleBlockUserArgs,
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
  return useMutation<ToggleBlockUserMutation, MutationToggleBlockUserArgs>(
    TOGGLE_BLOCK_USER,
    options,
  );
};

export default useToggleBlockUser;
