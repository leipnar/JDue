
import React from 'react';
import Button from './common/Button';
import Icon from './common/Icon';
import LanguageSwitcher from './common/LanguageSwitcher';
import { useTranslation } from '../context/LanguageContext';

interface HeaderProps {
  onToggleSidebar: () => void;
  onNotificationClick: () => void;
  notificationPermission: string;
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  viewTitle: string;
}

const Header: React.FC<HeaderProps> = ({ onToggleSidebar, onNotificationClick, notificationPermission, theme, toggleTheme, viewTitle }) => {
  const { t } = useTranslation();

  return (
    <header className="flex-shrink-0 flex items-center justify-between p-4 bg-light-card/80 dark:bg-dark-card/80 backdrop-blur-sm border-b border-slate-200 dark:border-dark-border z-20 h-16">
      <div className="flex items-center">
        <button onClick={onToggleSidebar} className="p-2 rounded-full text-slate-500 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 mr-2 lg:hidden">
           <Icon name="menu" className="w-6 h-6" />
        </button>
        <h1 className="text-xl font-bold text-slate-800 dark:text-slate-100 truncate">{viewTitle}</h1>
      </div>
      <div className="flex items-center space-x-1 sm:space-x-2">
        <button onClick={onNotificationClick} title={notificationPermission === 'granted' ? t('header.notifications.enabled') : t('header.notifications.enable')} className={`p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-700 ${notificationPermission === 'granted' ? 'text-green-500' : 'text-slate-500 dark:text-slate-400'}`}>
            <Icon name="notification" className="w-6 h-6" />
        </button>
        <button onClick={toggleTheme} title={t('header.theme.toggle')} className="p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-500 dark:text-slate-400">
            <Icon name={theme === 'light' ? 'moon' : 'sun'} className="w-6 h-6" />
        </button>

        <LanguageSwitcher />
      </div>
    </header>
  );
};

export default Header;