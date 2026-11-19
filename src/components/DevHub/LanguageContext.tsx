import React, {createContext, useCallback, useContext, useEffect, useMemo, useState} from 'react';
import {languages, type Language, type LanguageId} from '@site/src/data/devhub';

const STORAGE_KEY = 'cosmos-devhub-lang';
const DEFAULT_LANGUAGE: LanguageId = 'python';

interface LanguageContextValue {
  language: Language;
  setLanguage: (id: LanguageId) => void;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

function isLanguageId(value: string | null | undefined): value is LanguageId {
  return languages.some((l) => l.id === value);
}

export function LanguageProvider({children}: {children: React.ReactNode}): React.ReactElement {
  // Start from the default so server-rendered and first client render match; apply the
  // visitor's choice after hydration.
  const [id, setId] = useState<LanguageId>(DEFAULT_LANGUAGE);

  useEffect(() => {
    const fromUrl = new URLSearchParams(window.location.search).get('lang');
    const fromStorage = window.localStorage.getItem(STORAGE_KEY);
    const initial = [fromUrl, fromStorage].find(isLanguageId);
    if (initial) setId(initial);
  }, []);

  const setLanguage = useCallback((next: LanguageId) => {
    setId(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* storage can be unavailable (private mode); the choice still applies for this visit */
    }
    const url = new URL(window.location.href);
    url.searchParams.set('lang', next);
    window.history.replaceState(null, '', url);
  }, []);

  const value = useMemo<LanguageContextValue>(
    () => ({language: languages.find((l) => l.id === id) ?? languages[0], setLanguage}),
    [id, setLanguage],
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage(): LanguageContextValue {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage must be used inside <LanguageProvider>');
  return ctx;
}
