export { AI_PATTERN_FIELDS, AI_PATTERN_SEPARATOR_PRESETS } from "./patterns/constants";
export {
  buildTargetTranslationFields,
  getPatternFieldLabel,
  getPatternSeparatorLabel,
  getTranslationFieldLanguage,
  hasConfiguredArticles,
  translationGroupName
} from "./patterns/fieldUtils";
export {
  buildAiParsingPattern,
  buildVisualAiParsingPattern,
  escapeRegExp,
  hasText,
  normalizeAiInputLine,
  separatorPattern,
  stripMarkdownFence
} from "./patterns/regexBuilder";
export { suggestAiParsingPattern, type AiParsingSuggestion } from "./patterns/suggestions";
