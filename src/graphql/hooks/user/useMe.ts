import {gql} from '@apollo/client';
import useCustomLazyQuery from '../../utils/useCustomLazyQuery';

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
  return useCustomLazyQuery<MeQuery>(ME, {
    fetchPolicy: 'no-cache',
  });
};

export default useMe;
