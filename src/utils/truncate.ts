export const truncateWords = (str: string, numWords = 5) => {
  const words = str.split(" ");
  return words.length > numWords ? words.slice(0, numWords).join(" ") + "…" : str;
};

export const truncateChars = (str: string, maxChars = 100): string => {
  return str.length > maxChars ? str.slice(0, maxChars) + "…" : str;
};
type Unit = {
  value: number;
  suffix: string;
};

const units: Unit[] = [
  { value: 1_00_00_000, suffix: "Cr" },
  { value: 10_00_000, suffix: "Million" },
  { value: 1_00_000, suffix: "Lac" },
  { value: 1_000, suffix: "K" },
];

export const formatNumberWithSuffix = (value: number): string => {
  for (const unit of units) {
    if (value >= unit.value) {
      return `${(value / unit.value).toFixed(2)} ${unit.suffix}`;
    }
  }
  return value.toString();
};
