import {useState, useEffect, useCallback} from 'react';
import type {LangStrings} from '../types/enchant';
import {LANGUAGES} from '../constants';

const LANG_STORAGE_KEY = 'enchant-order-lang';

function mergeKeys(target: Record<string, unknown>, fallback: Record<string, unknown>): Record<string, unknown> {
  const result: Record<string, unknown> = {};
  for (const key in fallback) {
    if (typeof fallback[key] === 'object' && fallback[key] !== null && !Array.isArray(fallback[key])) {
      result[key] = mergeKeys(
        (Object.prototype.hasOwnProperty.call(target, key) ? target[key] : {}) as Record<string, unknown>,
        fallback[key] as Record<string, unknown>,
      );
    } else {
      result[key] = Object.prototype.hasOwnProperty.call(target, key) ? target[key] : fallback[key];
    }
  }
  return result;
}

export function useLanguage() {
  const [langId, setLangIdState] = useState<string>(() => {
    const stored = localStorage.getItem(LANG_STORAGE_KEY);
    return stored && LANGUAGES[stored] ? stored : 'en';
  });
  const [strings, setStrings] = useState<LangStrings | null>(null);
  const [error, setError] = useState<string | null>(null);

  const setLangId = useCallback((id: string) => {
    if (!LANGUAGES[id]) return;
    setLangIdState(id);
    localStorage.setItem(LANG_STORAGE_KEY, id);
  }, []);

  useEffect(() => {
    const base = import.meta.env.BASE_URL;

    const loadJson = (lang: string) =>
      fetch(`${base}languages/${lang}.json`).then((r) => {
        if (!r.ok) throw new Error(`Failed to load ${lang}.json`);
        return r.json();
      });

    if (langId === 'en') {
      loadJson('en')
        .then((data) => {
          setError(null);
          setStrings(data);
        })
        .catch((e) => setError(e.message));
    } else {
      Promise.all([loadJson(langId), loadJson('en')])
        .then(([langData, enData]) => {
          setError(null);
          setStrings(mergeKeys(langData, enData) as unknown as LangStrings);
        })
        .catch((e) => setError(e.message));
    }
  }, [langId]);

  return {langId, setLangId, strings, error, languages: LANGUAGES};
}
