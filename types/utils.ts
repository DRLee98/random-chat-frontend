export type Filter<T extends unknown[], V> = T extends [infer A, ...infer Rest]
  ? [...(A extends V ? [] : [A]), ...Filter<Rest, V>]
  : [];

export type FilterNull<T> = {
  [K in keyof T]: Filter<[T[K]], null>[number];
};
