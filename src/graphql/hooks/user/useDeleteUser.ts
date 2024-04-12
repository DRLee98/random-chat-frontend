import {useMutation} from '@apollo/client';
import {graphql} from '@app/graphql/__generated__';

import type {MutationHookOptions} from '@apollo/client';
import type {DeleteUserMutation} from '@app/graphql/__generated__/graphql';

const DELETE_USER = graphql(`
  mutation deleteUser {
    deleteUser {
      ok
      error
    }
  }
`);

const useDeleteUser = (options?: MutationHookOptions<DeleteUserMutation>) => {
  return useMutation<DeleteUserMutation>(DELETE_USER, options);
};

export default useDeleteUser;
