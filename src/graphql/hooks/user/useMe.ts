import {gql, useQuery} from '@apollo/client';

import type {MeQuery} from '../../types/graphql';

const ME = gql`
  query me {
    me {
      ok
      error
      me {
        id
        nickname
        profileUrl
        bio
        allowMessage
        language
        autoTranslation
      }
    }
  }
`;

const useMe = () => {
  const {data, ...rest} = useQuery<MeQuery>(ME);

  return {me: data?.me?.me, ...rest};
};

export default useMe;
