import React, { useState, useRef, useEffect, createContext, useContext } from 'react';
import Icon from './Icon';

interface ActionMenuContextType {
    close: () => void;
}
const ActionMenuContext = createContext<ActionMenuContextType | null>(null);

const ActionMenu = ({ children }: { children: React.ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const close = () => setIsOpen(false);

  return (
    <ActionMenuContext.Provider value={{ close }}>
        <div className="relative" ref={menuRef}>
        <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 rounded-full text-slate-500 hover:bg-slate-200 dark:hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 dark:focus:ring-offset-dark-card"
        >
            <Icon name="dots-vertical" className="w-5 h-5" />
        </button>

        {isOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-light-card dark:bg-dark-card rounded-md shadow-lg py-1 z-10 ring-1 ring-black ring-opacity-5 dark:ring-white dark:ring-opacity-10 animate-fade-in">
                {children}
            </div>
        )}
        </div>
    </ActionMenuContext.Provider>
  );
};

interface ItemProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
}

const Item = ({ children, className, ...props }: ItemProps) => {
    const context = useContext(ActionMenuContext);
    if (!context) {
        throw new Error('Item must be used within an ActionMenu');
    }
    const { close } = context;

    return (
        <button
            {...props}
            onClick={(e) => {
                if (props.onClick) props.onClick(e);
                close();
            }}
            className={`block w-full text-left px-4 py-2 text-sm font-sans ${className || 'text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700'}`}
        >
            {children}
        </button>
    );
}

const Separator = () => {
    return <div className="border-t border-slate-200 dark:border-dark-border my-1" />;
}


ActionMenu.Item = Item;
ActionMenu.Separator = Separator;

export default ActionMenu;