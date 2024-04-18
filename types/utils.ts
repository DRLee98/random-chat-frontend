export type Filter<T extends unknown[], V> = T extends [infer A, ...infer Rest]
  ? [...(A extends V ? [] : [A]), ...Filter<Rest, V>]
  : [];

export type FilterNull<T> = {
  [K in keyof T]: Filter<[T[K]], null>[number];
};

export type RequiredValue<T> = Required<FilterNull<T>>;

export type RequiredItem<
  T,
  K extends keyof T,
> = RequiredValue<T>[K] extends any[]
  ? RequiredValue<T>[K][number]
  : RequiredValue<T>[K];
