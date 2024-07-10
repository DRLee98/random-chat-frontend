import {graphql} from '@app/graphql/__generated__';
import {useQuery} from '@apollo/client';

import type {QueryHookOptions} from '@apollo/client';
import type {MyAccusationInfoQuery} from '@app/graphql/__generated__/graphql';

export const MY_ACCUSATION_INFO = graphql(`
  query myAccusationInfo {
    myAccusationInfo {
      ok
      error
      message
    }
  }
`);

const useMyAccusationInfo = (
  options?: QueryHookOptions<MyAccusationInfoQuery>,
) => {
  return useQuery<MyAccusationInfoQuery>(MY_ACCUSATION_INFO, {...options});
};

export default useMyAccusationInfo;
