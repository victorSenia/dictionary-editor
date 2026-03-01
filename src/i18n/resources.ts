import { en } from "./locales/en";
import { es } from "./locales/es";
import { fr } from "./locales/fr";
import { inLocale } from "./locales/in";
import { pt } from "./locales/pt";
import { it } from "./locales/it";
import { nl } from "./locales/nl";
import { pl } from "./locales/pl";
import { tr } from "./locales/tr";
import { ru } from "./locales/ru";
import { hi } from "./locales/hi";
import { bn } from "./locales/bn";
import { ur } from "./locales/ur";
import { zh } from "./locales/zh";
import { ja } from "./locales/ja";
import { ko } from "./locales/ko";
import { id } from "./locales/id";
import { vi } from "./locales/vi";
import { th } from "./locales/th";
import { uk } from "./locales/uk";
import { de } from "./locales/de";
import { ar } from "./locales/ar";
import { he } from "./locales/he";
import { fa } from "./locales/fa";

export const resources = {
  en,
  es,
  fr,
  "in": inLocale,
  pt,
  it,
  nl,
  pl,
  tr,
  ru,
  hi,
  bn,
  ur,
  zh,
  ja,
  ko,
  id,
  vi,
  th,
  uk,
  de,
  ar,
  he,
  fa,
} as const;

export type AppLanguage = keyof typeof resources;

