import { useCallback, useEffect, type RefObject } from "react";
import type { FirstDataRenderedEvent, GridSizeChangedEvent } from "ag-grid-community";
import type { AgGridReact } from "ag-grid-react";
import type { GridRow } from "../types/grid";

type Args = {
  gridRef: RefObject<AgGridReact<GridRow>>;
  isSettingsOpen: boolean;
  languageColumnsCount: number;
};

export function useGridLayout({ gridRef, isSettingsOpen, languageColumnsCount }: Args) {
  const fitColumnsToWidth = useCallback(() => {
    gridRef.current?.api.sizeColumnsToFit();
  }, [gridRef]);

  const handleGridSizeChanged = useCallback(
    (_event: GridSizeChangedEvent<GridRow>) => {
      fitColumnsToWidth();
    },
    [fitColumnsToWidth]
  );

  const handleFirstDataRendered = useCallback(
    (_event: FirstDataRenderedEvent<GridRow>) => {
      fitColumnsToWidth();
    },
    [fitColumnsToWidth]
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      fitColumnsToWidth();
    }, 0);
    return () => clearTimeout(timer);
  }, [fitColumnsToWidth, isSettingsOpen, languageColumnsCount]);

  return { handleGridSizeChanged, handleFirstDataRendered };
}
