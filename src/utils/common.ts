export const formatNumber = (num: number) => (num < 10 ? `0${num}` : num);

export const shuffleList = (list: string[], num: number) => {
  const newList: string[] = [];
  list.forEach((color, i) => {
    if (i % num === 0) return newList.push(color);
    newList.unshift(color);
  });

  return newList;
};

export const getRandomNumber = (max: number) => Math.floor(Math.random() * max);
