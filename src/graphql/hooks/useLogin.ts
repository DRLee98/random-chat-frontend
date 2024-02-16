import {gql, useLazyQuery} from '@apollo/client';
import {LoginQuery, QueryLoginArgs} from '../types/graphql';

const LOGIN = gql`
  query login($input: LoginInput!) {
    login(input: $input) {
      ok
      error
      token
    }
  }
`;

const useLogin = () => {
  return useLazyQuery<LoginQuery, QueryLoginArgs>(LOGIN);
};

export default useLogin;
