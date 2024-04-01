import {useMutation} from '@apollo/client';
import {graphql} from '@app/graphql/__generated__';

import type {MutationHookOptions} from '@apollo/client';
import type {
  MutationUpdateUserArgs,
  UpdateUserMutation,
} from '@app/graphql/__generated__/graphql';

const UPDATE_USER = graphql(`
  mutation updateUser($input: UpdateUserInput!) {
    updateUser(input: $input) {
      ok
      error
    }
  }
`);

const useUpdateUser = (
  options?: MutationHookOptions<UpdateUserMutation, MutationUpdateUserArgs>,
) => {
  return useMutation<UpdateUserMutation, MutationUpdateUserArgs>(
    UPDATE_USER,
    options,
  );
};

export default useUpdateUser;
