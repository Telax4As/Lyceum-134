import React, { useState } from 'react';
import { useAppStore } from '../store/useAppStore';
import { Lock, User, ArrowRight, GraduationCap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../api/supabase';

export default function Login() {
  const { theme, language, setRole, setUid, setEmail } = useAppStore();
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const translations = {
    ru: {
      title: 'Лицей №134',
      subtitle: 'Введите данные для входа',
      userLabel: 'Логин',
      passLabel: 'Пароль',
      button: 'Войти в систему',
      incorrect: 'Неверные учетные данные',
      notFound: 'Данный пользователь не найден в базе данных',
    },
    kz: {
      title: '№134 Лицей',
      subtitle: 'Жүйеге кіру үшін мәліметтерді енгізіңіз',
      userLabel: 'Логин',
      passLabel: 'Құпия сөз',
      button: 'Жүйеге кіру',
      incorrect: 'Қате мәліметтер',
      notFound: 'Бұл пайдаланушы дерекқорда табылдады',
    },
    en: {
      title: 'Lyceum #134',
      subtitle: 'Enter your credentials to login',
      userLabel: 'Username',
      passLabel: 'Password',
      button: 'Login to System',
      incorrect: 'Incorrect credentials',
      notFound: 'User not found in the database'
    }
  };

  const t = translations[language];

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    
    const { data: AuthData, error: AuthError } = await supabase.auth.signInWithPassword({
      email: login,
      password: password
    });

    if (AuthError || !AuthData.user) {
      setError(t.incorrect);
      setIsLoading(false);
      return;
    }

    const { data: UserData, error: UserError } = await supabase.from('users').select('role').eq('id', AuthData.user.id).single();
    setIsLoading(false);

    if (UserError || !UserData) {
      setError(UserError ? UserError.message : t.notFound);
      return;
    } 
    
    setRole(UserData.role);
    setUid(AuthData.user.id);
    setEmail(AuthData.user.email);
    navigate('/');
  };

  // Вместо фильтра blur юзаем нативный легкий градиент
  const lightGradient = 'radial-gradient(circle, rgba(56,189,248,0.15) 0%, rgba(255,255,255,0) 70%)';
  const darkGradient = 'radial-gradient(circle, rgba(37,99,235,0.08) 0%, rgba(2,6,23,0) 70%)';

  return (
    <div className={`
      min-h-screen flex items-center justify-center p-6 overflow-hidden relative duration-100
      ${theme === 'light' ? 'bg-slate-50' : 'bg-[#020617]'}
    `}>
      
      {/* Аппаратные плоские фоновые круги без CSS-фильтра blur */}
      <div 
        className="absolute top-1/4 left-1/4 w-[600px] h-[600px] pointer-events-none transform-gpu translate-z-0"
        style={{ backgroundImage: theme === 'light' ? lightGradient : darkGradient }}
      />
      <div 
        className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] pointer-events-none transform-gpu translate-z-0"
        style={{ backgroundImage: theme === 'light' ? lightGradient : darkGradient }}
      />

      <div className="relative w-full max-w-md z-10">
        {/* Карточка: ПОЛНОЕ отсутствие теней, анимаций и прозрачности */}
        <div className={`
          p-8 rounded-[2.5rem] border duration-100
          ${theme === 'light' 
            ? 'bg-white border-slate-200 text-slate-900' 
            : 'bg-[#0b1224] border-slate-800 text-white'}
        `}>
          
          <div className="flex flex-col items-center mb-10">
            <div className={`
              p-4 rounded-2xl mb-4 duration-100
              ${theme === 'light' ? 'bg-slate-100 text-sky-600' : 'bg-slate-900 text-blue-400'}
            `}>
              <GraduationCap size={32} />
            </div>
            <h1 className="text-2xl font-black tracking-tight">
              {t.title}
            </h1>
            <p className={`
              text-sm font-medium mt-2
              ${theme === 'light' ? 'text-slate-400' : 'text-slate-500'}
            `}>
              {t.subtitle}
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            {/* Поле Username */}
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 ml-1">
                {t.userLabel}
              </label>
              <div className="relative">
                <div className={`
                  absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none
                  ${theme === 'light' ? 'text-slate-400' : 'text-slate-500'}
                `}>
                  <User size={20} />
                </div>
                <input
                  type="text"
                  value={login}
                  onChange={(e) => setLogin(e.target.value)}
                  className={`
                    w-full pl-12 pr-4 py-4 border rounded-2xl outline-none duration-100
                    ${theme === 'light' 
                      ? 'bg-slate-50 border-slate-200 focus:border-slate-400 text-slate-900' 
                      : 'bg-slate-900 border-slate-800 focus:border-slate-600 text-white'}
                  `}
                  placeholder="email"
                />
              </div>
            </div>

            {/* Поле Password */}
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 ml-1">
                {t.passLabel}
              </label>
              <div className="relative">
                <div className={`
                  absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none 
                  ${theme === 'light' ? 'text-slate-400' : 'text-slate-500'}
                `}>
                  <Lock size={20} />
                </div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={`
                    w-full pl-12 pr-4 py-4 border rounded-2xl outline-none duration-100
                    ${theme === 'light' 
                      ? 'bg-slate-50 border-slate-200 focus:border-slate-400 text-slate-900' 
                      : 'bg-slate-900 border-slate-800 focus:border-slate-600 text-white'}
                  `}
                  placeholder="••••••••"
                />
              </div>
            </div>

            {/* Кнопка входа — БЕЗ теней и ховер-анимаций */}
            <button
              type="submit"
              className={`
                w-full py-4 mb-4 text-white rounded-2xl font-bold text-sm flex items-center justify-center gap-3
                ${theme === 'light' ? 'bg-sky-600' : 'bg-blue-600'}
              `}
            >
              {t.button}
              <ArrowRight size={18} />
            </button>
            
            {/* Статус контейнер — статический текст для разгрузки процессора */}
            <div className="flex items-center justify-center mt-7 text-sm h-6 font-medium">
                {isLoading && (
                  <span className={theme === 'light' ? 'text-sky-600' : 'text-blue-400'}>
                    Загрузка...
                  </span>
                )}

                {!isLoading && error && (
                  <span className="text-red-500">{error}</span>
                )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}