import {gql, useMutation} from '@apollo/client';

import type {MutationHookOptions} from '@apollo/client';
import type {
  CreateUserMutation,
  MutationCreateUserArgs,
} from '../../types/graphql';

const CREATE_USER = gql`
  mutation createUser($input: CreateUserInput!) {
    createUser(input: $input) {
      ok
      error
      user {
        id
      }
    }
  }
`;

const useCreateUser = (
  options?: MutationHookOptions<CreateUserMutation, MutationCreateUserArgs>,
) => {
  return useMutation<CreateUserMutation, MutationCreateUserArgs>(
    CREATE_USER,
    options,
  );
};

export default useCreateUser;
