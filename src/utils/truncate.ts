export const truncateWords = (str: string, numWords = 5) => {
  const words = str.split(" ");
  return words.length > numWords ? words.slice(0, numWords).join(" ") + "…" : str;
};

export const truncateChars = (str: string, maxChars = 100): string => {
  return str.length > maxChars ? str.slice(0, maxChars) + "…" : str;
};
