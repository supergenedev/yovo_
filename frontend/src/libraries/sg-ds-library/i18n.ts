/* Minimal i18n helper bundled with the SG-DS-LIBRARY preset export.
 *
 * Replace this module with a wrapper around your own i18n library
 * (react-i18next, lingui, etc.) by re-exporting a compatible
 * `t` / `setLang` / `getLang` while keeping the same call sites.
 */

import data from './i18n.json';

export type SgDsLibraryI18nDictionary = Record<string, Record<string, string>>;

const dictionary: SgDsLibraryI18nDictionary = data as SgDsLibraryI18nDictionary;
const availableLangs = Object.keys(dictionary);
let currentLang: string = availableLangs[0] ?? 'default';

export function t(key: string, fallback?: string): string {
  return dictionary[currentLang]?.[key] ?? fallback ?? key;
}

export function setLang(lang: string): void {
  if (dictionary[lang]) currentLang = lang;
}

export function getLang(): string {
  return currentLang;
}

export function getAvailableLangs(): string[] {
  return [...availableLangs];
}
