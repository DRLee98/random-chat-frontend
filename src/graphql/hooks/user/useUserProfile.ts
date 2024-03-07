import {gql, useQuery} from '@apollo/client';

import type {QueryHookOptions} from '@apollo/client';
import type {
  QueryUserProfileArgs,
  UserProfileInput,
  UserProfileQuery,
} from '@app/graphql/types/graphql';

const USER_PROFILE = gql`
  query userProfile($input: UserProfileInput!) {
    userProfile(input: $input) {
      ok
      error
      user {
        id
        nickname
        profileUrl
        bio
      }
    }
  }
`;

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
