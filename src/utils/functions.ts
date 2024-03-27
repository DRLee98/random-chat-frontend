export const dateStringToNumber = (date?: string) => {
  return date ? new Date(date).getTime() : 0;
};

export const getTimestamp = (date: string) => {
  const today = new Date().getTime();
  const target = new Date(date).getTime();

  const diff = today - target;

  if (diff < 1000 * 60) {
    return '방금 전';
  } else if (diff < 1000 * 60 * 60) {
    return `${Math.floor(diff / (1000 * 60))}분 전`;
  } else if (diff < 1000 * 60 * 60 * 12) {
    return `${Math.floor(diff / (1000 * 60 * 60))}시간 전`;
  } else if (diff < 1000 * 60 * 60 * 24) {
    return '오늘';
  } else if (diff < 1000 * 60 * 60 * 24 * 2) {
    return '어제';
  } else if (diff < 1000 * 60 * 60 * 24 * 7) {
    return `${Math.floor(diff / (1000 * 60 * 60 * 24))}일 전`;
  } else {
    const year = new Date(date).getFullYear();
    const month = new Date(date).getMonth() + 1;
    const day = new Date(date).getDate();

    const currentYear = new Date().getFullYear();
    if (year === currentYear) {
      return `${month}월 ${day}일`;
    }
    return `${year}. ${month}. ${day}.`;
  }
};

export const formatNumber = (num: number) => (num < 10 ? `0${num}` : num);

export const shuffleList = (list: string[], num: number) => {
  const newList: string[] = [];
  list.forEach((color, i) => {
    if (i % num === 0) return newList.push(color);
    newList.unshift(color);
  });

  return newList;
};
