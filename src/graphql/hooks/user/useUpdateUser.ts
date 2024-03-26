import {gql, useMutation} from '@apollo/client';

import type {MutationHookOptions} from '@apollo/client';
import type {
  MutationUpdateUserArgs,
  UpdateUserMutation,
} from '@app/graphql/types/graphql';

const UPDATE_USER = gql`
  mutation updateUser($input: UpdateUserInput!) {
    updateUser(input: $input) {
      ok
      error
    }
  }
`;

const useUpdateUser = (
  options?: MutationHookOptions<UpdateUserMutation, MutationUpdateUserArgs>,
) => {
  return useMutation<UpdateUserMutation, MutationUpdateUserArgs>(
    UPDATE_USER,
    options,
  );
};

export default useUpdateUser;
