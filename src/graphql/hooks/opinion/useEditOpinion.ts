import {useMutation} from '@apollo/client';
import {graphql} from '@app/graphql/__generated__';

import type {MutationHookOptions} from '@apollo/client';
import type {
  EditOpinionMutation,
  MutationEditOpinionArgs,
} from '@app/graphql/__generated__/graphql';

const EDIT_OPINION = graphql(`
  mutation editOpinion($input: EditOpinionInput!) {
    editOpinion(input: $input) {
      ok
      error
      opinion {
        ...OpinionBase
      }
    }
  }
`);

const useEditOpinion = (
  options?: MutationHookOptions<EditOpinionMutation, MutationEditOpinionArgs>,
) => {
  return useMutation<EditOpinionMutation, MutationEditOpinionArgs>(
    EDIT_OPINION,
    options,
  );
};

export default useEditOpinion;
