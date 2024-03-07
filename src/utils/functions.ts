export const DateStringToNumber = (date?: string) => {
  return date ? new Date(date).getTime() : 0;
};
