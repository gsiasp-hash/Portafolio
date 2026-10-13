import es from "./es";
import en from "./en";
import { defaultLocale } from "./config";

const dictionaries = { es, en };

export function getDictionary(lang) {
  return dictionaries[lang] ?? dictionaries[defaultLocale];
}
