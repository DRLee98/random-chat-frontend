import {formatNumber} from './common';

export const dateStringToNumber = (date?: string) => {
  return date ? new Date(date).getTime() : 0;
};

export const getYMD = (date: Date) => {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  return {year, month, day};
};

export const getDateString = (date: string) => {
  const newDate = new Date(date);
  const {year, month, day} = getYMD(newDate);

  return `${year}.${formatNumber(month)}.${formatNumber(day)}`;
};

export const getDatestamp = (date: string) => {
  const today = new Date().getTime();
  const target = new Date(date).getTime();

  const diff = today - target;

  const todayYMD = getYMD(new Date());
  const targetYMD = getYMD(new Date(date));

  if (diff < 1000 * 60) {
    return '방금 전';
  } else if (diff < 1000 * 60 * 60) {
    return `${Math.floor(diff / (1000 * 60))}분 전`;
  } else if (diff < 1000 * 60 * 60 * 12) {
    return `${Math.floor(diff / (1000 * 60 * 60))}시간 전`;
  } else if (JSON.stringify(todayYMD) === JSON.stringify(targetYMD)) {
    return '오늘';
  } else if (
    targetYMD.year === todayYMD.year &&
    targetYMD.month === todayYMD.month &&
    targetYMD.day === todayYMD.day - 1
  ) {
    return '어제';
  } else if (diff < 1000 * 60 * 60 * 24 * 7) {
    return `${Math.floor(diff / (1000 * 60 * 60 * 24))}일 전`;
  } else {
    if (targetYMD.year === todayYMD.year) {
      return `${targetYMD.month}월 ${targetYMD.day}일`;
    }
    return `${targetYMD.year}. ${targetYMD.month}. ${targetYMD.day}.`;
  }
};

export const getTimestamp = (date: string) => {
  const newDate = new Date(date);

  const hour = newDate.getHours();
  const minute = newDate.getMinutes();

  return `${hour >= 12 ? '오후' : '오전'} ${hour % 12}:${formatNumber(minute)}`;
};

export const isToday = (date: string) => {
  const target = new Date(date);
  const today = new Date();

  return target.toLocaleDateString() === today.toLocaleDateString();
};

export const getDayStr = (dayNum: number): string => {
  switch (dayNum) {
    case 0:
      return '일요일';
    case 1:
      return '월요일';
    case 2:
      return '화요일';
    case 3:
      return '수요일';
    case 4:
      return '목요일';
    case 5:
      return '금요일';
    case 6:
      return '토요일';
    default:
      return '';
  }
};

export const getSystemDateStr = () => {
  const newDate = new Date();
  const {year, month, day} = getYMD(newDate);
  return `${year}년 ${month}월 ${day}일 ${getDayStr(newDate.getDay())}`;
};
