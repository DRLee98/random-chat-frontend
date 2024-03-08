export const dateStringToNumber = (date?: string) => {
  return date ? new Date(date).getTime() : 0;
};
