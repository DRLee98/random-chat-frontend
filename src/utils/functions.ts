export const dateStringToNumber = (date?: string) => {
  return date ? new Date(date).getTime() : 0;
};

const getYMD = (date: Date) => {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  return {year, month, day};
};

export const getTimestamp = (date: string) => {
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

export const formatNumber = (num: number) => (num < 10 ? `0${num}` : num);

export const shuffleList = (list: string[], num: number) => {
  const newList: string[] = [];
  list.forEach((color, i) => {
    if (i % num === 0) return newList.push(color);
    newList.unshift(color);
  });

  return newList;
};

const hexToRgb = (hex: string) => {
  if (!hex) return {r: 0, g: 0, b: 0};
  // HEX에서 # 제거
  let r = 0,
    g = 0,
    b = 0;
  // 3자리 HEX 코드인 경우
  if (hex.length === 4) {
    r = parseInt(hex[1] + hex[1], 16);
    g = parseInt(hex[2] + hex[2], 16);
    b = parseInt(hex[3] + hex[3], 16);
  }
  // 6자리 HEX 코드인 경우
  else if (hex.length === 7) {
    r = parseInt(hex[1] + hex[2], 16);
    g = parseInt(hex[3] + hex[4], 16);
    b = parseInt(hex[5] + hex[6], 16);
  }
  return {r, g, b};
};

const colorDistance = (hex1: string, hex2: string) => {
  const rgb1 = hexToRgb(hex1);
  const rgb2 = hexToRgb(hex2);

  // RGB 공간에서 두 색상 간의 유클리디안 거리 계산
  const distance = Math.sqrt(
    Math.pow(rgb1.r - rgb2.r, 2) +
      Math.pow(rgb1.g - rgb2.g, 2) +
      Math.pow(rgb1.b - rgb2.b, 2),
  );

  return distance;
};

export const areColorsSimilar = (
  hex1: string,
  hex2: string,
  threshold: number = 20,
) => {
  // 두 색상의 거리를 계산
  const distance = colorDistance(hex1, hex2);

  // 거리가 임계값보다 작거나 같으면 비슷한 것으로 판단
  return distance <= threshold;
};
