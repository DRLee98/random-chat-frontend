import {gql, useMutation} from '@apollo/client';
import type {
  CreateUserMutation,
  CreateUserOutput,
  MutationCreateUserArgs,
} from '../types/graphql';

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

const useCreateUser = () => {
  return useMutation<CreateUserMutation, MutationCreateUserArgs>(CREATE_USER);
};

export default useCreateUser;
