import {useMutation} from '@apollo/client';
import {graphql} from '@app/graphql/__generated__';

import type {MutationHookOptions} from '@apollo/client';
import type {
  CreateInviteMutation,
  MutationCreateInviteArgs,
} from '@app/graphql/__generated__/graphql';

const CREATE_INVITE = graphql(`
  mutation createInvite($input: CreateInviteInput!) {
    createInvite(input: $input) {
      ok
      error
      room {
        ...InviteRoomBase
      }
    }
  }
`);

const useCreateInvite = (
  options?: MutationHookOptions<CreateInviteMutation, MutationCreateInviteArgs>,
) => {
  return useMutation<CreateInviteMutation, MutationCreateInviteArgs>(
    CREATE_INVITE,
    options,
  );
};

export default useCreateInvite;
