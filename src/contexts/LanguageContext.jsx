// src/contexts/LanguageContext.jsx
// Provides { lang, t, toggle } to the whole app.
// lang persists to localStorage under 'presence_lang'.

import { createContext, useContext, useState } from 'react'
import translations from '../i18n/translations'

const LanguageContext = createContext()

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(
    () => localStorage.getItem('presence_lang') || 'en'
  )

  const toggle = () => {
    const next = lang === 'en' ? 'vi' : 'en'
    localStorage.setItem('presence_lang', next)
    setLang(next)
  }

  return (
    <LanguageContext.Provider value={{ lang, t: translations[lang], toggle }}>
      {children}
    </LanguageContext.Provider>
  )
}

export const useLanguage = () => useContext(LanguageContext)
