import {Me} from '@app/graphql/types/graphql';
import {atom, useRecoilValue, useSetRecoilState} from 'recoil';

export const meState = atom<Me | null>({
  key: 'meState',
  default: null,
});

export const setMeState = () => useSetRecoilState(meState);

export const useMeState = () => useRecoilValue(meState);
