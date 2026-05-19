import DeferredTextField from "../../components/DeferredTextField";
import { ROW_TYPE_TOPIC } from "../../models/dictionary";
import type { UpdateRowById } from "./types";

type Props = {
  rowId: string;
  value: string;
  updateRowById: UpdateRowById;
};

export default function TopicLabelEditor({ rowId, value, updateRowById }: Props) {
  return (
    <DeferredTextField
      kind="input"
      className="inline-topic-input"
      value={value}
      onCommit={(nextValue) => {
        updateRowById(rowId, (row) =>
          row.type === ROW_TYPE_TOPIC ? { ...row, label: nextValue } : row
        );
      }}
    />
  );
}
