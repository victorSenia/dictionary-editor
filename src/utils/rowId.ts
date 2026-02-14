type RowIdPrefix = "word" | "topic";

const ROW_ID_RADIX = 36;
const ROW_ID_RANDOM_START = 2;
const ROW_ID_RANDOM_END = 8;

export function createRowId(prefix: RowIdPrefix): string {
  return `${prefix}-${Date.now()}-${Math.random()
    .toString(ROW_ID_RADIX)
    .slice(ROW_ID_RANDOM_START, ROW_ID_RANDOM_END)}`;
}
