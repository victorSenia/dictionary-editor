import { createTopicRow, ROW_TYPE_TOPIC } from "../models/dictionary";
import type { GridRow } from "../types/grid";
import { createGridRowId } from "../utils/rowId";

type TopicAnchor = {
    topic: string;
    topicRowId?: string;
};

function findTopicSectionEndIndex(rows: GridRow[], topicRowId: string): number {
    const topicIndex = rows.findIndex((row) => row.rowId === topicRowId && row.type === ROW_TYPE_TOPIC);

    if (topicIndex < 0) {
        return rows.length;
    }

    for (let index = topicIndex + 1; index < rows.length; index += 1) {
        if (rows[index]?.type === ROW_TYPE_TOPIC) {
            return index;
        }
    }

    return rows.length;
}

export function insertAiGeneratedRows(
    rows: GridRow[],
    parsedRows: GridRow[],
    topicAnchor: TopicAnchor,
    requestedTopic: string
): GridRow[] {
    const trimmedRequestedTopic = requestedTopic.trim();
    const anchoredTopic = topicAnchor.topic.trim();

    const shouldInsertUnderExistingTopic =
        !!topicAnchor.topicRowId &&
        !!anchoredTopic &&
        anchoredTopic === trimmedRequestedTopic;

    if (shouldInsertUnderExistingTopic) {
        const insertAt = findTopicSectionEndIndex(rows, topicAnchor.topicRowId!);
        return [
            ...rows.slice(0, insertAt),
            ...parsedRows,
            ...rows.slice(insertAt)
        ];
    }

    if (trimmedRequestedTopic) {
        const topicRow: GridRow = {
            ...createTopicRow(trimmedRequestedTopic),
            rowId: createGridRowId()
        };

        return [...rows, topicRow, ...parsedRows];
    }

    return [...rows, ...parsedRows];
}