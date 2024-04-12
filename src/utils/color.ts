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
