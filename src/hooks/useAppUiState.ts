import { useCallback, useEffect, useMemo, useState } from "react";
import type { PaginationChangedEvent } from "ag-grid-community";
import type { GridRow } from "../types/grid";
import type { LastActionState } from "../types/lastAction";

type Args = {
  defaultPageSize: number;
  changeLanguage: (language: string) => Promise<unknown>;
};

export function useAppUiState({ defaultPageSize, changeLanguage }: Args) {
  const [isSettingsOpen, setIsSettingsOpen] = useState<boolean>(false);
  const [showOnlyInvalid, setShowOnlyInvalid] = useState<boolean>(false);
  const [pageSize, setPageSize] = useState<number>(defaultPageSize);

  const handleToggleSettings = useCallback(() => {
    setIsSettingsOpen((prev) => !prev);
  }, []);

  const handleToggleShowOnlyInvalid = useCallback(() => {
    setShowOnlyInvalid((prev) => !prev);
  }, []);

  const handleLanguageChange = useCallback(
    (language: string) => {
      void changeLanguage(language);
    },
    [changeLanguage]
  );

  const handlePaginationChanged = useCallback(
    (event: PaginationChangedEvent<GridRow>) => {
      const gridPageSize = event.api.paginationGetPageSize();
      if (gridPageSize !== pageSize) {
        setPageSize(gridPageSize);
      }
    },
    [pageSize]
  );

  return {
    isSettingsOpen,
    showOnlyInvalid,
    pageSize,
    setShowOnlyInvalid,
    handleToggleSettings,
    handleToggleShowOnlyInvalid,
    handleLanguageChange,
    handlePaginationChanged
  };
}

type TitleArgs = {
  title: string;
};

type StatusArgs = {
  t: (key: string, values?: Record<string, unknown>) => string;
  lastAction: LastActionState;
  currentFilePath: string | null;
};

export function useAppTitle({ title }: TitleArgs) {
  useEffect(() => {
    document.title = title;
  }, [title]);
}

export function useStatusText({ t, lastAction, currentFilePath }: StatusArgs) {
  return useMemo(() => {
    const actionText = lastAction ? t(lastAction.key, lastAction.values) : t("status.none");
    const lastActionText = t("status.lastAction", { action: actionText });
    const fileText = currentFilePath ? ` | ${t("status.file", { path: currentFilePath })}` : "";
    return `${lastActionText}${fileText}`;
  }, [currentFilePath, lastAction, t]);
}
