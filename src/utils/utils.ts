const roundToInteger = (number: number): number => Math.round(number);
const parseInteger = (value: string) => parseInt(value, 10);

function isString(value: unknown): value is string {
  return typeof value === 'string';
}

export { roundToInteger, parseInteger, isString };
