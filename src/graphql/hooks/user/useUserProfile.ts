import {useQuery} from '@apollo/client';
import {graphql} from '@app/graphql/__generated__';

import type {QueryHookOptions} from '@apollo/client';
import type {
  QueryUserProfileArgs,
  UserProfileInput,
  UserProfileQuery,
} from '@app/graphql/__generated__/graphql';

const USER_PROFILE = graphql(`
  query userProfile($input: UserProfileInput!) {
    userProfile(input: $input) {
      ok
      error
      user {
        id
        nickname
        profileUrl
        profileBgColor
        profileTextColor
        bio
      }
    }
  }
`);

const useUserProfile = (
  input: UserProfileInput,
  options?: Omit<
    QueryHookOptions<UserProfileQuery, QueryUserProfileArgs>,
    'variables'
  >,
) => {
  return useQuery<UserProfileQuery, QueryUserProfileArgs>(USER_PROFILE, {
    ...options,
    variables: {input},
  });
};

export default useUserProfile;
