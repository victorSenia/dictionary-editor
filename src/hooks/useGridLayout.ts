import { useCallback, useEffect, type RefObject } from "react";
import type {
  DisplayedColumnsChangedEvent,
  FirstDataRenderedEvent,
  GridSizeChangedEvent
} from "ag-grid-community";
import type { AgGridReact } from "ag-grid-react";
import type { GridRow } from "../types/grid";

type Args = {
  gridRef: RefObject<AgGridReact<GridRow>>;
  isSettingsOpen: boolean;
  languageColumnsCount: number;
  showArticleColumn: boolean;
  showAdditionalInformationColumn: boolean;
};

export function useGridLayout({
  gridRef,
  isSettingsOpen,
  languageColumnsCount,
  showArticleColumn,
  showAdditionalInformationColumn
}: Args) {
  const fitColumnsToWidth = useCallback(() => {
    gridRef.current?.api.sizeColumnsToFit();
  }, [gridRef]);

  const handleGridSizeChanged = useCallback(
    (_event: GridSizeChangedEvent<GridRow>) => {
      // Avoid feedback loops between auto-height, scrollbar appearance and sizeColumnsToFit.
      // Column fitting is handled on first render and explicit layout changes.
    },
    []
  );

  const handleFirstDataRendered = useCallback(
    (_event: FirstDataRenderedEvent<GridRow>) => {
      fitColumnsToWidth();
    },
    [fitColumnsToWidth]
  );
  const handleDisplayedColumnsChanged = useCallback(
    (_event: DisplayedColumnsChangedEvent<GridRow>) => {
      // Intentionally do nothing: fitting here causes visible tremble on cell selection.
    },
    []
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      fitColumnsToWidth();
    }, 0);
    return () => clearTimeout(timer);
  }, [
    fitColumnsToWidth,
    isSettingsOpen,
    languageColumnsCount,
    showArticleColumn,
    showAdditionalInformationColumn
  ]);

  useEffect(() => {
    let rafId: number | null = null;
    const scheduleFit = () => {
      if (rafId != null) {
        return;
      }
      rafId = window.requestAnimationFrame(() => {
        rafId = null;
        fitColumnsToWidth();
      });
    };

    window.addEventListener("resize", scheduleFit);
    document.addEventListener("fullscreenchange", scheduleFit);
    return () => {
      window.removeEventListener("resize", scheduleFit);
      document.removeEventListener("fullscreenchange", scheduleFit);
      if (rafId != null) {
        window.cancelAnimationFrame(rafId);
      }
    };
  }, [fitColumnsToWidth]);

  return { handleGridSizeChanged, handleFirstDataRendered, handleDisplayedColumnsChanged };
}
