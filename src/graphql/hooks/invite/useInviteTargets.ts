import {graphql} from '@app/graphql/__generated__';
import {useLazyQuery} from '@apollo/client';

import type {LazyQueryHookOptions} from '@apollo/client';
import type {
  InviteTargetsQuery,
  QueryInviteTargetsArgs,
} from '@app/graphql/__generated__/graphql';

export const INVITE_TARGETS = graphql(`
  query inviteTargets($input: InviteTargetsInput!) {
    inviteTargets(input: $input) {
      ok
      error
      targets {
        id
        nickname
        bio
        profileUrl
        profileBgColor
        profileTextColor
      }
    }
  }
`);

const useInviteTargets = (
  options?: LazyQueryHookOptions<InviteTargetsQuery, QueryInviteTargetsArgs>,
) => {
  return useLazyQuery<InviteTargetsQuery, QueryInviteTargetsArgs>(
    INVITE_TARGETS,
    {
      ...options,
      fetchPolicy: 'no-cache',
    },
  );
};

export default useInviteTargets;
