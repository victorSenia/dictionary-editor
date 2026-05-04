const ROW_ID_RADIX = 36;
const ROW_ID_RANDOM_START = 2;
const ROW_ID_RANDOM_END = 8;

export function createGridRowId(): string {
  return `grid-row-${Date.now()}-${Math.random()
    .toString(ROW_ID_RADIX)
    .slice(ROW_ID_RANDOM_START, ROW_ID_RANDOM_END)}`;
}
