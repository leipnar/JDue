import React from 'react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full shrink-0 text-center p-4">
      <div className="text-xs text-slate-500 dark:text-slate-400">
        <span>App Version V0.020</span>
        <span className="mx-2">·</span>
        <span>&copy; leipnar {currentYear}</span>
      </div>
    </footer>
  );
};

export default Footer;