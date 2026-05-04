export function getParseMessageStatus(parseMessage: string, fallbackErrorMessage: string): string {
  const suggestedPatternMatch = /^Pattern matched (\d+)\/(\d+) lines$/.exec(parseMessage);

  if (parseMessage.startsWith("Not parsed:")) {
    return "warning";
  }

  if (parseMessage === fallbackErrorMessage) {
    return "error";
  }

  if (suggestedPatternMatch && suggestedPatternMatch[1] !== suggestedPatternMatch[2]) {
    return "warning";
  }

  return parseMessage ? "ok" : "";
}
