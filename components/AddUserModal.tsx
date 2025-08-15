import React, { useState } from 'react';
import Modal from './common/Modal';
import Button from './common/Button';
import { useTranslation } from '../context/LanguageContext';
import { useData } from '../context/DataContext';

interface AddUserModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddUserModal: React.FC<AddUserModalProps> = ({ isOpen, onClose }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isAdding, setIsAdding] = useState(false);
  const { t } = useTranslation();
  const { addUserByAdmin } = useData();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (username.trim().length < 3) {
      setError(t('login.error.usernameLength'));
      return;
    }
    if (password.trim().length < 6) {
      setError(t('login.error.passwordLength'));
      return;
    }

    setIsAdding(true);
    try {
      await addUserByAdmin(username, password);
      onClose();
    } catch (err: any) {
      setError(err.message || "An unknown error occurred.");
    } finally {
      setIsAdding(false);
    }
  };

  const inputBaseClasses = "mt-1 block w-full border bg-white dark:bg-slate-800 border-slate-300 dark:border-dark-border rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-brand-primary focus:border-brand-primary sm:text-sm font-sans";
  const labelBaseClasses = "block text-sm font-medium text-slate-700 dark:text-slate-300";

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={t('admin.addUserModalTitle')}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="add-username" className={labelBaseClasses}>{t('login.usernamePlaceholder')}</label>
          <input
            type="text"
            id="add-username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className={inputBaseClasses}
            required
          />
        </div>
        <div>
          <label htmlFor="add-password" className={labelBaseClasses}>{t('admin.tempPassword')}</label>
          <input
            type="password"
            id="add-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={inputBaseClasses}
            required
          />
           <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">{t('admin.tempPasswordNotice')}</p>
        </div>

        {error && <p className="text-sm text-red-500">{error}</p>}
        
        <div className="flex justify-end space-x-3 pt-4 border-t border-slate-200 dark:border-dark-border">
          <Button type="button" variant="secondary" onClick={onClose} disabled={isAdding}>
            {t('taskModal.button.cancel')}
          </Button>
          <Button type="submit" disabled={isAdding}>
            {isAdding ? t('loading') : t('admin.addUser')}
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default AddUserModal;
