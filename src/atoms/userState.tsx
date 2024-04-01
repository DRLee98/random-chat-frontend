import {Me} from '@app/graphql/__generated__/graphql';
import {atom, useRecoilValue, useSetRecoilState} from 'recoil';

export const meState = atom<Me | null>({
  key: 'meState',
  default: null,
});

export const setMeState = () => useSetRecoilState(meState);

export const useMeState = () => useRecoilValue(meState);
