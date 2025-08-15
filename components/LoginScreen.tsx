
import React, { useState } from 'react';
import Button from './common/Button';
import Icon from './common/Icon';
import { useTranslation } from '../context/LanguageContext';
import Footer from './common/Footer';
import { useData } from '../context/DataContext';

interface LoginScreenProps {
  onForgotPassword: () => void;
}

// Moved outside the component to prevent re-creation on every render, which fixes the focus loss issue.
const InputField = ({ id, type, placeholder, value, onChange, autoComplete, isFirst = false, isLast = false }) => {
    return (
      <div>
        <label htmlFor={id} className="sr-only">{placeholder}</label>
        <input
          id={id}
          name={id}
          type={type}
          autoComplete={autoComplete}
          required
          className={`appearance-none bg-transparent relative block w-full px-4 py-3 border border-slate-300 dark:border-slate-600 placeholder-slate-500 dark:placeholder-slate-400 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 focus:z-10 sm:text-sm font-sans
            ${isFirst ? 'rounded-t-md' : ''}
            ${isLast ? 'rounded-b-md' : ''}
          `}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        />
      </div>
    );
};

const LoginScreen: React.FC<LoginScreenProps> = ({ onForgotPassword }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { t } = useTranslation();
  const { login, passkeyLogin } = useData();

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      await login(email, password);
      // No need for onLogin, DataContext handles user state change
    } catch (err: any) {
      const errorMessage = err.message || "An unknown error occurred.";
       if (errorMessage.includes('account has been')) {
           const status = errorMessage.split(' ')[4];
           setError(t('login.error.accountStatus', {status}));
       } else {
           setError(errorMessage);
       }
    } finally {
      setIsLoading(false);
    }
  };

  const handlePasskeyLogin = async () => {
    setError('');
    setIsLoading(true);
    try {
        const passkeyCredential = await navigator.credentials.get({
            publicKey: {
                challenge: crypto.getRandomValues(new Uint8Array(32)),
                timeout: 60000,
            }
        }) as PublicKeyCredential | null;

        if (passkeyCredential) {
            await passkeyLogin(passkeyCredential);
        }
    } catch (err) {
        console.error("Passkey login failed:", err);
        setError(t('login.passkeyError'));
    } finally {
        setIsLoading(false);
    }
  };
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-light-bg dark:bg-dark-bg p-4">
      <div className="w-full max-w-md lg:max-w-4xl min-h-[600px] flex flex-col lg:flex-row overflow-hidden animate-fade-in rounded-2xl shadow-2xl">
        
        {/* Gradient Info Panel */}
        <div className="w-full lg:w-1/2 bg-login-gradient text-white p-8 lg:p-12 flex flex-col justify-between">
           <h1 className="text-2xl lg:text-3xl font-bold">{t('appName')}</h1>
           <div className="text-center lg:text-left py-8 lg:py-0">
               <Icon name="check-circle" className="w-12 h-12 lg:w-16 lg:h-16 text-white/50 mx-auto lg:mx-0" />
               <p className="mt-4 text-2xl lg:text-4xl font-extrabold leading-tight">{t('login.brand.title')}</p>
               <p className="mt-2 text-white/80 hidden lg:block">{t('login.brand.description')}</p>
           </div>
           <div className="h-1 lg:hidden"></div> {/* Spacer to maintain justify-between on mobile */}
        </div>

        {/* Form Panel */}
        <div className="w-full lg:w-1/2 p-8 sm:p-12 flex flex-col justify-center bg-light-card dark:bg-dark-card">
            <div>
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-primary-100 dark:bg-primary-900/50">
                <Icon name="check-circle" className="h-8 w-8 text-primary-600 dark:text-primary-400" />
              </div>
              <h2 className="mt-6 text-3xl font-extrabold text-center text-slate-900 dark:text-slate-100">
                {t('login.signInTitle')}
              </h2>
              <p className="mt-2 text-center text-sm text-slate-600 dark:text-slate-400">
                {t('login.adminAddsUsers')}
              </p>
            </div>

            <div className="mt-8">
              <form className="space-y-6" onSubmit={handlePasswordSubmit}>
                <fieldset disabled={isLoading}>
                    <div className="rounded-md shadow-sm -space-y-px">
                        <InputField id="email" type="email" placeholder={t('login.emailPlaceholder')} value={email} onChange={e => setEmail(e.target.value)} autoComplete="email" isFirst />
                        <InputField id="password" type="password" placeholder={t('login.passwordPlaceholder')} value={password} onChange={e => setPassword(e.target.value)} autoComplete="current-password" isLast />
                    </div>

                    <div className="flex items-center justify-end text-sm">
                        <a href="#" onClick={(e) => { e.preventDefault(); onForgotPassword(); }} className="font-medium text-primary-600 hover:text-primary-500 dark:text-primary-400 dark:hover:text-primary-300">
                            {t('login.forgotPassword')}
                        </a>
                    </div>

                    {error && <p className="text-sm text-red-500 text-center pt-2">{error}</p>}
                    <Button type="submit" className="w-full mt-6" size="lg" disabled={isLoading}>
                        {isLoading ? '...' : t('login.signInButton')}
                    </Button>
                </fieldset>
              </form>
              
              {window.PublicKeyCredential && (
                  <>
                      <div className="mt-6 flex items-center justify-center">
                          <div className="w-full border-t border-slate-300 dark:border-slate-700"></div>
                          <span className="px-3 text-slate-500 dark:text-slate-400 bg-light-card dark:bg-dark-card text-xs uppercase">{t('login.or')}</span>
                          <div className="w-full border-t border-slate-300 dark:border-slate-700"></div>
                      </div>
                      <Button type="button" variant="secondary" size="lg" className="w-full mt-6" onClick={handlePasskeyLogin} disabled={isLoading}>
                          <Icon name="passkey" className="w-5 h-5 mr-2" />
                          {t('login.signInWithPasskey')}
                      </Button>
                  </>
              )}
            </div>
            <div className="mt-auto pt-8">
              <Footer />
            </div>
        </div>

      </div>
    </div>
  );
};

export default LoginScreen;
