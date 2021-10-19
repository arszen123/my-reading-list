export const tryParseInt = (number: string, radix?: number): number => {
  const parsed = parseInt(number, radix);

  return Number.isNaN(parsed) ? 0 : parsed;
};
