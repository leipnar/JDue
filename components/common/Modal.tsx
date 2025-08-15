
import React, { useEffect } from 'react';
import Icon from './Icon';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <div onClick={onClose} className="fixed inset-0 bg-black/70 backdrop-blur-sm animate-fade-in" aria-hidden="true"></div>
      
      <div className="relative bg-light-card dark:bg-dark-card rounded-xl shadow-2xl w-full max-w-lg mx-4 my-8 transform transition-all animate-slide-in-up border border-slate-200 dark:border-dark-border">
        <div className="flex items-center justify-between p-5 border-b border-solid border-slate-200 dark:border-dark-border">
          <h3 className="text-xl font-semibold text-slate-800 dark:text-slate-100" id="modal-title">
            {title}
          </h3>
          <button
            onClick={onClose}
            className="p-1 ml-auto rounded-full text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
          >
            <Icon name="close" className="w-6 h-6"/>
          </button>
        </div>
        <div className="relative p-6 flex-auto max-h-[70vh] overflow-y-auto">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;