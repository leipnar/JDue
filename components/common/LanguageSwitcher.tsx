import React, { useState, useRef, useEffect } from 'react';
import { useTranslation, Language } from '../../context/LanguageContext';
import Icon from './Icon';

const LanguageSwitcher: React.FC = () => {
  const { language, setLanguage, t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  
  const languages: Record<Language, string> = {
    en: t('language.english'),
    de: t('language.german'),
    ja: t('language.japanese'),
    es: t('language.spanish'),
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [dropdownRef]);

  return (
    <div className="relative" ref={dropdownRef}>
      <button 
        onClick={() => setIsOpen(!isOpen)} 
        title={t('language.change')} 
        className="flex items-center space-x-1 p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 font-semibold text-sm transition-colors"
      >
        <span>{language.toUpperCase()}</span>
        <Icon name="chevron-down" className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-40 bg-white dark:bg-dark-card rounded-md shadow-lg py-1 z-50 animate-fade-in ring-1 ring-black ring-opacity-5 dark:ring-white dark:ring-opacity-10">
          {Object.entries(languages).map(([code, name]) => (
            <button
              key={code}
              onClick={() => {
                setLanguage(code as Language);
                setIsOpen(false);
              }}
              className={`block w-full text-left px-4 py-2 text-sm font-sans ${language === code ? 'font-bold text-indigo-600 dark:text-indigo-400' : 'text-slate-700 dark:text-slate-200'} hover:bg-slate-100 dark:hover:bg-slate-700`}
            >
              {name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default LanguageSwitcher;