
import React, { createContext, useContext, ReactNode } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';

// Statically import the translation files as modules for robust loading
import enTranslations from '../locales/en';
import deTranslations from '../locales/de';
import esTranslations from '../locales/es';
import jaTranslations from '../locales/ja';

export type Language = 'en' | 'de' | 'es' | 'ja';
type Translations = { [key: string]: string | any };

interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string, replacements?: { [key: string]: string }) => string;
}

const allTranslations: Record<Language, Translations> = {
  en: enTranslations,
  de: deTranslations,
  es: esTranslations,
  ja: jaTranslations,
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Helper to get nested keys from translation object
const getNestedTranslation = (translations: Translations, key: string): string | undefined => {
  return key.split('.').reduce((obj, k) => (obj && obj[k] !== undefined ? obj[k] : undefined), translations) as string | undefined;
};

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useLocalStorage<Language>('language', 'en');

  const t = (key: string, replacements?: { [key: string]: string }): string => {
    // Get the correct dictionary; fallback to English if something is wrong
    const translations = allTranslations[language] || allTranslations.en;
    let translation = getNestedTranslation(translations, key) || key;
    
    if (replacements) {
      Object.keys(replacements).forEach(rKey => {
        translation = translation.replace(`{${rKey}}`, replacements[rKey]);
      });
    }

    return translation;
  };
  
  const value = { language, setLanguage, t };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useTranslation = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useTranslation must be used within a LanguageProvider');
  }
  return context;
};
