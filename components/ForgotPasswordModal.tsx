import React, { useState } from 'react';
import Modal from './common/Modal';
import Button from './common/Button';
import { useTranslation } from '../context/LanguageContext';
import { useData } from '../context/DataContext';

interface ForgotPasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ForgotPasswordModal: React.FC<ForgotPasswordModalProps> = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { t } = useTranslation();
  const { forgotPassword } = useData();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.includes('@')) return;

    setIsLoading(true);
    await forgotPassword(email);
    setIsLoading(false);
    setIsSubmitted(true);
  };
  
  const handleClose = () => {
    setEmail('');
    setIsSubmitted(false);
    onClose();
  }

  const inputClasses = "mt-1 block w-full border bg-white dark:bg-slate-800 border-slate-300 dark:border-dark-border rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm font-sans";
  const labelClasses = "block text-sm font-medium text-slate-700 dark:text-slate-300";

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title={t('forgotPasswordModal.title')}>
      {isSubmitted ? (
        <div className="text-center">
          <p className="text-slate-600 dark:text-slate-300">{t('forgotPasswordModal.success', { email })}</p>
          <div className="mt-6">
            <Button onClick={handleClose}>{t('forgotPasswordModal.close')}</Button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <p className="text-sm text-slate-600 dark:text-slate-400">{t('forgotPasswordModal.description')}</p>
          <div>
            <label htmlFor="reset-email" className="sr-only">{t('forgotPasswordModal.emailPlaceholder')}</label>
            <input
              type="email"
              id="reset-email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={inputClasses}
              placeholder={t('forgotPasswordModal.emailPlaceholder')}
              required
            />
          </div>
          <div className="flex justify-end space-x-3 pt-4 border-t border-slate-200 dark:border-dark-border">
            <Button type="button" variant="secondary" onClick={handleClose} disabled={isLoading}>
              {t('taskModal.button.cancel')}
            </Button>
            <Button type="submit" disabled={isLoading || !email.includes('@')}>
              {isLoading ? t('loading') : t('forgotPasswordModal.button')}
            </Button>
          </div>
        </form>
      )}
    </Modal>
  );
};

export default ForgotPasswordModal;
