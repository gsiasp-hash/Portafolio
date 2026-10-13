export const locales = ["es", "en"];
export const defaultLocale = "es";
export const LOCALE_COOKIE = "NEXT_LOCALE";

export function hasLocale(value) {
  return locales.includes(value);
}
