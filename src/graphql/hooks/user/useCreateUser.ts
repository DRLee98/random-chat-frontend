import {useMutation} from '@apollo/client';
import {graphql} from '@app/graphql/__generated__';

import type {MutationHookOptions} from '@apollo/client';
import type {
  CreateUserMutation,
  MutationCreateUserArgs,
} from '@app/graphql/__generated__/graphql';

const CREATE_USER = graphql(`
  mutation createUser($input: CreateUserInput!) {
    createUser(input: $input) {
      ok
      error
      user {
        id
      }
    }
  }
`);

const useCreateUser = (
  options?: MutationHookOptions<CreateUserMutation, MutationCreateUserArgs>,
) => {
  return useMutation<CreateUserMutation, MutationCreateUserArgs>(
    CREATE_USER,
    options,
  );
};

export default useCreateUser;
