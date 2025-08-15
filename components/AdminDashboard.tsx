import React, { useState, useEffect, useMemo } from 'react';
import { User } from '../types';
import Button from './common/Button';
import Icon from './common/Icon';
import { useTranslation } from '../context/LanguageContext';
import Footer from './common/Footer';
import AddUserModal from './AddUserModal';
import ActionMenu from './common/ActionMenu';
import { useData } from '../context/DataContext';

interface AdminDashboardProps {
  onProfileClick: () => void;
}

type SystemStats = {
    userCount: number;
    projectCount: number;
    taskCount: number;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ onProfileClick }) => {
  const { currentUser, users, getSystemStats, updateUserStatus, deleteUser, logout } = useData();
  const [stats, setStats] = useState<SystemStats>({ userCount: 0, projectCount: 0, taskCount: 0});
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddUserModalOpen, setAddUserModalOpen] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    const fetchStats = async () => {
      try {
          const statsData = await getSystemStats();
          setStats(statsData);
      } catch (error) {
          console.error("Failed to fetch admin data:", error);
      }
    };
    fetchStats();
  }, [users, getSystemStats]);
  
  const handleUserStatusChange = async (userId: string, status: User['status']) => {
    try {
        await updateUserStatus(userId, status);
    } catch (error) {
        console.error("Failed to update user status:", error);
        alert("Error updating user status.");
    }
  }

  const handleDeleteUser = async (userId: string) => {
    if (window.confirm(t('admin.confirmDelete'))) {
        try {
            await deleteUser(userId);
        } catch (error) {
            console.error("Failed to delete user:", error);
            alert("Error deleting user.");
        }
    }
  };
  
  const filteredUsers = useMemo(() => {
    return users.filter(user => user.username.toLowerCase().includes(searchTerm.toLowerCase()));
  }, [users, searchTerm]);

  const statusClasses: Record<User['status'], string> = {
    active: 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300',
    banned: 'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300',
    deactivated: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300',
  };

  const StatCard = ({ icon, title, value }) => (
    <div className="bg-light-card dark:bg-dark-card p-6 rounded-xl shadow-lg flex items-center space-x-4 border border-slate-200 dark:border-dark-border">
        <div className="bg-primary-100 dark:bg-primary-900/50 p-4 rounded-full">
            <Icon name={icon} className="w-8 h-8 text-primary-600 dark:text-primary-400" />
        </div>
        <div>
            <p className="text-sm text-slate-500 dark:text-slate-400 font-medium uppercase tracking-wider">{title}</p>
            <p className="text-3xl font-bold text-slate-800 dark:text-slate-100">{value}</p>
        </div>
    </div>
  );

  return (
    <>
      <div className="min-h-screen bg-light-bg dark:bg-dark-bg flex flex-col">
        <div className="flex-grow">
          <header className="bg-light-card/80 dark:bg-dark-card/80 backdrop-blur-sm shadow-sm border-b border-slate-200 dark:border-dark-border">
            <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
                <div className="flex items-center">
                    <Icon name="check-circle" className="w-8 h-8 text-primary-600 dark:text-primary-400" />
                    <h1 className="ml-3 text-2xl font-bold text-slate-800 dark:text-slate-100">{t('admin.title')}</h1>
                </div>
                <div className="flex items-center space-x-2">
                    <Button onClick={onProfileClick} variant="secondary" size="sm">
                       <Icon name="profile" className="w-5 h-5 mr-2" />
                       {t('admin.profileSettings')}
                    </Button>
                    <Button onClick={logout} variant="ghost">
                      <Icon name="logout" className="w-5 h-5 mr-2" />
                      {t('header.logout')}
                    </Button>
                </div>
            </div>
          </header>
          <main>
            <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                {/* Stats Section */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 px-4 sm:px-0 animate-fade-in">
                    <StatCard icon="profile" title={t('admin.totalUsers')} value={stats.userCount} />
                    <StatCard icon="folder" title={t('admin.totalProjects')} value={stats.projectCount} />
                    <StatCard icon="check-circle" title={t('admin.totalTasks')} value={stats.taskCount} />
                </div>

                {/* User Management Section */}
                <div className="px-4 sm:px-0 animate-slide-in-up">
                    <div className="bg-light-card dark:bg-dark-card rounded-xl shadow-lg border border-slate-200 dark:border-dark-border">
                        <div className="p-6 border-b border-slate-200 dark:border-dark-border flex flex-col sm:flex-row justify-between items-center gap-4">
                            <h2 className="text-2xl font-semibold text-slate-800 dark:text-slate-100">{t('admin.userManagement')}</h2>
                            <div className="flex items-center gap-4 w-full sm:w-auto">
                                <div className="relative flex-grow sm:w-64">
                                    <Icon name="search" className="w-5 h-5 text-slate-400 dark:text-slate-500 absolute top-1/2 left-3 transform -translate-y-1/2"/>
                                    <input
                                        type="text"
                                        placeholder={t('admin.searchUsers')}
                                        value={searchTerm}
                                        onChange={e => setSearchTerm(e.target.value)}
                                        className="w-full pl-10 pr-4 py-2 border bg-light-card dark:bg-slate-800 border-slate-300 dark:border-dark-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 font-sans"
                                    />
                                </div>
                                <Button onClick={() => setAddUserModalOpen(true)}>
                                    <Icon name="plus" className="w-5 h-5 mr-2" />
                                    {t('admin.addUser')}
                                </Button>
                            </div>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="min-w-full">
                                <thead className="bg-slate-50 dark:bg-slate-800">
                                <tr>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-300 uppercase tracking-wider">{t('login.usernamePlaceholder')}</th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-300 uppercase tracking-wider">{t('admin.status')}</th>
                                    <th scope="col" className="relative px-6 py-3"><span className="sr-only">{t('admin.actions')}</span></th>
                                </tr>
                                </thead>
                                <tbody className="bg-light-card dark:bg-dark-card divide-y divide-slate-200 dark:divide-dark-border">
                                {filteredUsers.map((user) => (
                                    <tr key={user.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center">
                                            <div className="text-sm font-medium text-slate-900 dark:text-slate-100">{user.username}</div>
                                            {user.isAdmin && <span className="ml-2 px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-secondary-100 text-secondary-800 dark:bg-secondary-900/50 dark:text-secondary-300">{t('admin.role.admin')}</span>}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${statusClasses[user.status]}`}>
                                            {t(`admin.statusType.${user.status}`)}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        {user.id !== currentUser?.id ? (
                                            <ActionMenu>
                                                {user.status === 'active' ? (
                                                    <>
                                                        <ActionMenu.Item onClick={() => handleUserStatusChange(user.id, 'banned')}>{t('admin.banUser')}</ActionMenu.Item>
                                                        <ActionMenu.Item onClick={() => handleUserStatusChange(user.id, 'deactivated')}>{t('admin.deactivateUser')}</ActionMenu.Item>
                                                    </>
                                                ) : (
                                                    <ActionMenu.Item onClick={() => handleUserStatusChange(user.id, 'active')}>{t('admin.activateUser')}</ActionMenu.Item>
                                                )}
                                                <ActionMenu.Separator />
                                                <ActionMenu.Item onClick={() => handleDeleteUser(user.id)} className="text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/50 hover:text-red-700 dark:hover:text-red-300">
                                                    {t('admin.deleteUser')}
                                                </ActionMenu.Item>
                                            </ActionMenu>
                                        ) : <span className="text-xs text-slate-500 pr-4">{t('admin.currentUser')}</span>}
                                    </td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
          </main>
        </div>
        <Footer />
      </div>
      {isAddUserModalOpen && (
        <AddUserModal
            isOpen={isAddUserModalOpen}
            onClose={() => setAddUserModalOpen(false)}
        />
      )}
    </>
  );
};

export default AdminDashboard;