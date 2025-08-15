
import React, { useState, useEffect, useMemo } from 'react';
import { Project, Task } from './types';
import LoginScreen from './components/LoginScreen';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import TaskList from './components/TaskList';
import AdminDashboard from './components/AdminDashboard';
import ProfileModal from './components/ProfileModal';
import { useTranslation } from './context/LanguageContext';
import Footer from './components/common/Footer';
import ForgotPasswordModal from './components/ForgotPasswordModal';
import { useData } from './context/DataContext';

type ActiveView = { type: 'project', id: string } | { type: 'today' } | { type: 'upcoming' };

const App: React.FC = () => {
  const { currentUser, projects, tasks, isLoading, markNotificationSent } = useData();

  const [activeView, setActiveView] = useState<ActiveView | null>(null);
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [isProfileModalOpen, setProfileModalOpen] = useState(false);
  const [isForgotPasswordModalOpen, setForgotPasswordModalOpen] = useState(false);
  
  const [theme, setTheme] = useState<'light' | 'dark'>(() => (localStorage.getItem('theme') as 'light' | 'dark') || 'light');
  const { t } = useTranslation();
  
  const [notificationPermission, setNotificationPermission] = useState('default');

  // --- Theme ---
  useEffect(() => {
    const body = document.body;
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
      body.classList.remove('bg-body-gradient-light');
      body.classList.add('bg-body-gradient-dark');
    } else {
      document.documentElement.classList.remove('dark');
      body.classList.remove('bg-body-gradient-dark');
      body.classList.add('bg-body-gradient-light');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };

  // --- Data Loading & View Management ---
  useEffect(() => {
    if (currentUser && !currentUser.isAdmin && !activeView) {
      if (projects.length > 0) {
        setActiveView({ type: 'project', id: projects[0].id });
      }
    }
    if (!currentUser) {
        setActiveView(null);
    }
  }, [currentUser, projects, activeView]);

  const displayedTasks = useMemo(() => {
    if (!activeView) return [];
    
    if (activeView.type === 'project') {
      return tasks.filter(t => t.projectId === activeView.id);
    }

    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

    if (activeView.type === 'today') {
      return tasks.filter(t => {
        if (!t.dueDate) return false;
        const dueDate = new Date(t.dueDate);
        return dueDate >= today && dueDate < new Date(today.getTime() + 24 * 60 * 60 * 1000);
      });
    }

    if (activeView.type === 'upcoming') {
      const upcomingEndDate = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);
      return tasks.filter(t => {
        if (!t.dueDate) return false;
        const dueDate = new Date(t.dueDate);
        return dueDate >= today && dueDate < upcomingEndDate;
      });
    }

    return [];
  }, [tasks, activeView]);

  const currentViewInfo = useMemo(() => {
    if (!activeView) return { title: '', project: null };
    
    switch (activeView.type) {
      case 'project':
        const project = projects.find(p => p.id === activeView.id);
        return { title: project?.name || '', project: project || null };
      case 'today':
        return { title: t('sidebar.today'), project: null };
      case 'upcoming':
        return { title: t('sidebar.upcoming'), project: null };
      default:
        return { title: '', project: null };
    }
  }, [activeView, projects, t]);

  // --- Notifications ---
  useEffect(() => {
     setNotificationPermission(typeof window !== 'undefined' && 'Notification' in window ? Notification.permission : 'denied');
  }, []);

  const requestNotificationPermission = () => {
    if ('Notification' in window) {
      Notification.requestPermission().then(permission => {
        setNotificationPermission(permission);
      });
    }
  };

  useEffect(() => {
    if (notificationPermission !== 'granted' || !currentUser) return;

    const interval = setInterval(() => {
      const now = Date.now();
      
      tasks.forEach(task => {
        if (!task.dueDate || task.isComplete) return;
        const dueDate = new Date(task.dueDate).getTime();

        const processReminder = (reminder) => {
          const reminderKey = `${reminder.isBefore ? 'before' : 'after'}-${reminder.value}-${reminder.unit}`;
          if (task.notificationsSent[reminderKey]) return;

          let reminderTime = dueDate;
          const multiplier = reminder.unit === 'minutes' ? 60000 : reminder.unit === 'hours' ? 3600000 : 86400000;
          const offset = reminder.value * multiplier;
          reminderTime = reminder.isBefore ? dueDate - offset : dueDate + offset;
          
          if (now >= reminderTime) {
            const body = reminder.isBefore
              ? `Due in ${reminder.value} ${reminder.unit}.`
              : `${reminder.value} ${reminder.unit} have passed since the due time.`;
            new Notification(`Reminder: ${task.title}`, { body, tag: task.id + reminderKey });
            markNotificationSent(task.id, reminderKey);
          }
        };

        if (dueDate <= now && !task.notificationsSent['overdue']) {
            new Notification(`Task Overdue: ${task.title}`, { body: 'This task is now overdue.', tag: task.id + 'overdue' });
            markNotificationSent(task.id, 'overdue');
        }
        
        task.reminders.forEach(processReminder);
      });
    }, 60000);

    return () => clearInterval(interval);
  }, [notificationPermission, currentUser, tasks, markNotificationSent]);
  
  // --- Render Logic ---
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-light-bg dark:bg-dark-bg">
        <div className="text-xl font-semibold text-slate-600 dark:text-slate-300">{t('loading')}</div>
      </div>
    );
  }

  if (!currentUser) {
    return (
        <>
            <LoginScreen onForgotPassword={() => setForgotPasswordModalOpen(true)} />
            {isForgotPasswordModalOpen && (
                <ForgotPasswordModal 
                    isOpen={isForgotPasswordModalOpen}
                    onClose={() => setForgotPasswordModalOpen(false)}
                />
            )}
        </>
    );
  }

  const renderAppContent = () => {
    if (currentUser.isAdmin) {
      return (
        <AdminDashboard 
          onProfileClick={() => setProfileModalOpen(true)}
        />
      );
    }

    return (
      <div className="h-screen bg-light-bg dark:bg-dark-bg font-sans">
        <Sidebar 
          activeView={activeView} 
          setActiveView={setActiveView}
          onAddProjectSuccess={(newProject) => setActiveView({ type: 'project', id: newProject.id })}
          isOpen={isSidebarOpen}
          setIsOpen={setSidebarOpen}
          onProfileClick={() => setProfileModalOpen(true)}
        />
        <div className="flex flex-col h-full lg:pl-72">
          <Header 
            onToggleSidebar={() => setSidebarOpen(!isSidebarOpen)}
            onNotificationClick={requestNotificationPermission}
            notificationPermission={notificationPermission}
            theme={theme}
            toggleTheme={toggleTheme}
            viewTitle={currentViewInfo.title}
          />
          <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
            {activeView ? (
              <TaskList 
                project={currentViewInfo.project}
                title={currentViewInfo.title}
                tasks={displayedTasks}
              />
            ) : (
              <div className="flex items-center justify-center h-full">
                <div className="text-center">
                  <h2 className="text-2xl font-semibold text-slate-500 dark:text-slate-400 font-heading">{t('taskList.noProject.title')}</h2>
                  <p className="mt-2 text-slate-400 dark:text-slate-500">{t('taskList.noProject.description')}</p>
                </div>
              </div>
            )}
          </main>
          <Footer />
        </div>
      </div>
    );
  };

  return (
    <>
      {renderAppContent()}
      {isProfileModalOpen && (
        <ProfileModal
          isOpen={isProfileModalOpen}
          onClose={() => setProfileModalOpen(false)}
        />
      )}
    </>
  );
};

export default App;