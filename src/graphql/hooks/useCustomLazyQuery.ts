import {useLazyQuery} from '@apollo/client';

import type {OperationVariables, QueryResult} from '@apollo/client';

function useCustomLazyQuery<
  TData,
  Args extends OperationVariables = OperationVariables,
>(
  ...args: Parameters<typeof useLazyQuery<TData, Args>>
): [
  (variables?: Args) => Promise<TData | undefined>,
  QueryResult<TData, Args>,
] {
  const [fn, result] = useLazyQuery<TData, Args>(...args);

  const returnFn = async (variables?: Args) => {
    if (result.loading) return;
    if (result.called) {
      return (await result.refetch(variables)).data;
    }
    return (await fn(variables && {variables})).data;
  };

  return [returnFn, result];
}

export default useCustomLazyQuery;
