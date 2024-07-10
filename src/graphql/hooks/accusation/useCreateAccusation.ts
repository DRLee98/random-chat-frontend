import {useMutation} from '@apollo/client';
import {graphql} from '@app/graphql/__generated__';

import type {MutationHookOptions} from '@apollo/client';
import type {
  CreateAccusationMutation,
  MutationCreateAccusationArgs,
} from '@app/graphql/__generated__/graphql';

const CREATE_ACCUSATION = graphql(`
  mutation createAccusation($input: CreateAccusationInput!) {
    createAccusation(input: $input) {
      ok
      error
    }
  }
`);

const useCreateAccusation = (
  options?: MutationHookOptions<
    CreateAccusationMutation,
    MutationCreateAccusationArgs
  >,
) => {
  return useMutation<CreateAccusationMutation, MutationCreateAccusationArgs>(
    CREATE_ACCUSATION,
    options,
  );
};

export default useCreateAccusation;
