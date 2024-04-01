import {useMutation} from '@apollo/client';
import {graphql} from '@app/graphql/__generated__';

import type {MutationHookOptions} from '@apollo/client';
import type {
  ToggleBlockUserMutation,
  MutationToggleBlockUserArgs,
} from '@app/graphql/__generated__/graphql';

const TOGGLE_BLOCK_USER = graphql(`
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
`);

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
