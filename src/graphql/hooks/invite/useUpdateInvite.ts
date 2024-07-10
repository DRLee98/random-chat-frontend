import {useMutation} from '@apollo/client';
import {graphql} from '@app/graphql/__generated__';

import type {MutationHookOptions} from '@apollo/client';
import type {
  UpdateInviteMutation,
  MutationUpdateInviteArgs,
} from '@app/graphql/__generated__/graphql';

const UPDATE_INVITE = graphql(`
  mutation updateInvite($input: UpdateInviteInput!) {
    updateInvite(input: $input) {
      ok
      error
      room {
        ...MyRoomBase
      }
    }
  }
`);

const useUpdateInvite = (
  options?: MutationHookOptions<UpdateInviteMutation, MutationUpdateInviteArgs>,
) => {
  return useMutation<UpdateInviteMutation, MutationUpdateInviteArgs>(
    UPDATE_INVITE,
    options,
  );
};

export default useUpdateInvite;
