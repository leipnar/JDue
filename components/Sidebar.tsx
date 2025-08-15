import React, { useState } from 'react';
import { Project } from '../types';
import Button from './common/Button';
import Icon from './common/Icon';
import { useTranslation } from '../context/LanguageContext';
import { useData } from '../context/DataContext';

type ActiveView = { type: 'project', id: string } | { type: 'today' } | { type: 'upcoming' };

interface SidebarProps {
  activeView: ActiveView | null;
  setActiveView: (view: ActiveView) => void;
  onAddProjectSuccess: (project: Project) => void;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  onProfileClick: () => void;
}

const NavLink: React.FC<{
    isActive: boolean;
    onClick: () => void;
    iconName: string;
    text: string;
}> = ({ isActive, onClick, iconName, text }) => {
    return (
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            onClick();
          }}
          className={`flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-colors group ${
            isActive
              ? 'bg-primary-100 text-primary-700 dark:bg-primary-900/50 dark:text-primary-300 font-semibold'
              : 'text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800'
          }`}
        >
          <Icon name={iconName} className={`w-5 h-5 mr-3 ${isActive ? 'text-primary-500' : 'text-slate-400 group-hover:text-slate-500 dark:group-hover:text-slate-300'}`} />
          <span className="truncate">{text}</span>
        </a>
    );
};

const Sidebar: React.FC<SidebarProps> = ({ activeView, setActiveView, onAddProjectSuccess, isOpen, setIsOpen, onProfileClick }) => {
  const [newProjectName, setNewProjectName] = useState('');
  const [isAdding, setIsAdding] = useState(false);
  const { t } = useTranslation();
  const { currentUser, projects, addProject, logout } = useData();

  const handleAddProject = async () => {
    if (newProjectName.trim() && !isAdding) {
      setIsAdding(true);
      try {
        const newProject = await addProject(newProjectName.trim());
        setNewProjectName('');
        onAddProjectSuccess(newProject);
      } catch (error) {
        console.error("Failed to add project:", error);
      } finally {
        setIsAdding(false);
      }
    }
  };
  
  const handleViewChange = (view: ActiveView) => {
      setActiveView(view);
      if (window.innerWidth < 1024) {
          setIsOpen(false);
      }
  };

  if (!currentUser) return null;

  return (
    <>
      <aside className={`fixed top-0 left-0 h-full bg-light-card dark:bg-dark-card border-r border-slate-200 dark:border-dark-border w-72 flex flex-col z-40 transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}>
        <div className="flex items-center justify-between p-4 border-b border-slate-200 dark:border-dark-border h-16">
          <div className="flex items-center">
            <Icon name="check-circle" className="w-8 h-8 text-primary-600 dark:text-primary-400" />
            <h1 className="ml-3 text-2xl font-bold text-slate-800 dark:text-slate-100">{t('appName')}</h1>
          </div>
          <button onClick={() => setIsOpen(false)} className="p-2 rounded-full text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-700 lg:hidden">
             <Icon name="close" className="w-6 h-6" />
          </button>
        </div>

        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {/* Smart Views */}
          <div className="space-y-1 mb-4">
              <NavLink text={t('sidebar.today')} iconName="calendar-star" isActive={activeView?.type === 'today'} onClick={() => handleViewChange({ type: 'today' })} />
              <NavLink text={t('sidebar.upcoming')} iconName="fast-forward" isActive={activeView?.type === 'upcoming'} onClick={() => handleViewChange({ type: 'upcoming' })} />
          </div>

          <h2 className="px-3 py-2 text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider">{t('sidebar.projects')}</h2>
          {projects.map(project => (
            <NavLink 
                key={project.id}
                text={project.name}
                iconName="folder"
                isActive={activeView?.type === 'project' && activeView.id === project.id}
                onClick={() => handleViewChange({ type: 'project', id: project.id })}
            />
          ))}
        </nav>

        {/* Add Project Section */}
        <div className="p-4 border-t border-slate-200 dark:border-dark-border">
          <div className="space-y-2">
            <input
              type="text"
              value={newProjectName}
              onChange={(e) => setNewProjectName(e.target.value)}
              placeholder={t('sidebar.newProjectPlaceholder')}
              className="w-full px-3 py-2 text-sm border bg-light-card dark:bg-slate-800 border-slate-300 dark:border-dark-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 font-sans"
              onKeyDown={(e) => e.key === 'Enter' && handleAddProject()}
              disabled={isAdding}
            />
            <Button onClick={handleAddProject} className="w-full" disabled={!newProjectName.trim() || isAdding}>
                <Icon name="plus" className="w-5 h-5 mr-2"/>
                {isAdding ? t('loading') : t('sidebar.addProjectButton')}
            </Button>
          </div>
        </div>
        
        {/* User Profile Section */}
        <div className="p-4 border-t border-slate-200 dark:border-dark-border">
            <div className="flex items-center justify-between">
                <button onClick={onProfileClick} className="flex items-center space-x-3 group flex-grow min-w-0">
                    <div className="w-10 h-10 rounded-full bg-light-bg dark:bg-dark-bg flex items-center justify-center group-hover:ring-2 ring-primary-500 transition-all">
                        <Icon name="profile" className="w-6 h-6 text-slate-500 dark:text-slate-400 group-hover:text-primary-600 dark:group-hover:text-primary-300"/>
                    </div>
                    <div className="font-semibold text-slate-700 dark:text-slate-200 text-sm truncate min-w-0">
                        <p className="truncate">{currentUser.username}</p>
                        <p className="text-xs text-slate-500 dark:text-slate-400 font-normal truncate">{currentUser.email}</p>
                    </div>
                </button>
                 <Button onClick={logout} variant="ghost" size="icon" title={t('header.logout')}>
                    <Icon name="logout" className="w-6 h-6 text-slate-500 dark:text-slate-400"/>
                </Button>
            </div>
        </div>
      </aside>
       {isOpen && <div onClick={() => setIsOpen(false)} className="fixed inset-0 bg-black/60 z-30 lg:hidden"></div>}
    </>
  );
};

export default Sidebar;
