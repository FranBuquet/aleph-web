"use client";

import { createContext, useContext, useState } from "react";

export type Lang = "es" | "en";

const LangCtx = createContext<{ lang: Lang; toggle: () => void }>({
  lang: "es",
  toggle: () => {},
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Lang>("es");
  return (
    <LangCtx.Provider value={{ lang, toggle: () => setLang(l => l === "es" ? "en" : "es") }}>
      {children}
    </LangCtx.Provider>
  );
}

export function useLang() {
  return useContext(LangCtx);
}
