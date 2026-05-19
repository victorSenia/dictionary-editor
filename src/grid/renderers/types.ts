import type { GridRow } from "../../types/grid";

export type UpdateRowById = (rowId: string, transform: (row: GridRow) => GridRow) => void;
