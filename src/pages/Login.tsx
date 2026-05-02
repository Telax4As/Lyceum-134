import React, { useState } from 'react';
import { useAppStore } from '../store/useAppStore';
import { Lock, User, ArrowRight, GraduationCap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  // Достаем состояние темы и языка для полной адаптации
  const { theme, language, setRole } = useAppStore();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const translations = {
    ru: {
      title: 'Лицей №134',
      subtitle: 'Введите данные для входа',
      userLabel: 'Логин',
      passLabel: 'Пароль',
      button: 'Войти в систему',
      incorrect: 'Неверные учетные данные'
    },
    kz: {
      title: '№134 Лицей',
      subtitle: 'Жүйеге кіру үшін мәліметтерді енгізіңіз',
      userLabel: 'Логин',
      passLabel: 'Құпия сөз',
      button: 'Жүйеге кіру',
      incorrect: 'Қате мәліметтер'
    },
    en: {
      title: 'Lyceum #134',
      subtitle: 'Enter your credentials to login',
      userLabel: 'Username',
      passLabel: 'Password',
      button: 'Login to System',
      incorrect: 'Incorrect credentials'
    }
  };

  const t = translations[language];
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Логика определения роли (в будущем заменишь на запрос к базе)
    if (username === 'admin' && password === 'admin') {
      setRole('admin');
      navigate('/'); 
      setError('');
    } else if (username === 'student' && password === 'student') {
      setRole('student');
      navigate('/');
      setError('');
    } else {
      setError(t.incorrect);
    }
  };

  return (
    <div className={`
      min-h-screen flex items-center justify-center p-6 transition-colors duration-100 overflow-hidden
      ${theme === 'light' ? 'bg-slate-50' : 'bg-[#020617]'}
    `}>
      
      {/* Декоративные элементы свечения, зависящие от темы */}
      <div className={`
        absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-[120px] transition-all duration-100
        ${theme === 'light' ? 'bg-sky-400/20' : 'bg-blue-600/10'}
      `} />
      <div className={`
        absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full blur-[120px] transition-all duration-100
        ${theme === 'light' ? 'bg-blue-400/20' : 'bg-sky-600/10'}
      `} />

      <div className="relative w-full max-w-md">
        <div className={`
          backdrop-blur-2xl p-8 rounded-[2.5rem] border transition-all duration-100
          ${theme === 'light' 
            ? 'bg-white/80 border-sky-100 shadow-2xl shadow-sky-200/20' 
            : 'bg-[#0b1224]/80 border-slate-800 shadow-none'}
        `}>
          
          <div className="flex flex-col items-center mb-10">
            <div className={`
              p-4 rounded-2xl mb-4 transition-colors
              ${theme === 'light' ? 'bg-sky-50 text-sky-600' : 'bg-blue-500/10 text-blue-400'}
            `}>
              <GraduationCap size={32} />
            </div>
            <h1 className={`
              text-2xl font-black tracking-tight transition-colors
              ${theme === 'light' ? 'text-slate-900' : 'text-white'}
            `}>
              {t.title}
            </h1>
            <p className="text-sm font-medium text-slate-400 dark:text-slate-500 mt-2">
              {t.subtitle}
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            {/* Поле Username */}
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 ml-1">
                {t.userLabel}
              </label>
              <div className="relative group">
                <div className={`
                  absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none transition-colors
                  ${theme === 'light' ? 'text-slate-300 group-focus-within:text-sky-500' : 'text-slate-600 group-focus-within:text-blue-400'}
                `}>
                  <User size={20} />
                </div>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className={`
                    w-full pl-12 pr-4 py-4 border rounded-2xl outline-none transition-all
                    ${theme === 'light' 
                      ? 'bg-slate-50/50 border-slate-200 focus:ring-4 focus:ring-sky-500/10 focus:border-sky-500 text-slate-900' 
                      : 'bg-slate-900/40 border-slate-800 focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 text-white'}
                  `}
                  placeholder="username"
                />
              </div>
            </div>

            {/* Поле Password */}
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 ml-1">
                {t.passLabel}
              </label>
              <div className="relative group">
                <div className={`
                  absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none transition-colors
                  ${theme === 'light' ? 'text-slate-300 group-focus-within:text-sky-500' : 'text-slate-600 group-focus-within:text-blue-400'}
                `}>
                  <Lock size={20} />
                </div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={`
                    w-full pl-12 pr-4 py-4 border rounded-2xl outline-none transition-all
                    ${theme === 'light' 
                      ? 'bg-slate-50/50 border-slate-200 focus:ring-4 focus:ring-sky-500/10 focus:border-sky-500 text-slate-900' 
                      : 'bg-slate-900/40 border-slate-800 focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 text-white'}
                  `}
                  placeholder="••••••••"
                />
              </div>
            </div>

            {/* Кнопка входа */}
            <button
              type="submit"
              className={`
                w-full py-4 mb-4 text-white rounded-2xl font-bold text-sm transition-all active:scale-[0.97] flex items-center justify-center gap-3 group
                ${theme === 'light' 
                  ? 'bg-sky-600 hover:bg-sky-700 shadow-xl shadow-sky-200/40' 
                  : 'bg-blue-600 hover:bg-blue-700 shadow-none'}
              `}
            >
              {t.button}
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
            
            <div className='flex items-center justify-center mt-7 text-red-500 text-sm'>{error}</div>
          </form>
        </div>
      </div>
    </div>
  );
}