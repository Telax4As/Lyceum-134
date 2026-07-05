import { useState, useEffect, useRef } from 'react';
import { useAppStore } from '../../store/useAppStore';
import { Sun, Moon, Globe, GraduationCap } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useClickAway, useLockBodyScroll } from 'react-use';
import { LoginBtn } from './ui/LoginBtn';
import { ProfileBtn } from './ui/ProfileBtn';

export default function GuestHeader() {
  const { theme, language, setTheme, setLanguage, uid } = useAppStore();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  

  // Реф для отслеживания кликов вне мобильного меню
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  // Закрываем меню при смене страницы
  useEffect(() => setIsOpen(false), [location]);

  // Блокируем скролл страницы, когда меню открыто
  useLockBodyScroll(isOpen);

  // Закрываем меню при клике вне его области (используем react-use)
  useClickAway(mobileMenuRef, (e) => {
    // Исключаем кнопку бургера из проверки, чтобы клик по ней не вызывал двойной триггер
    if ((e.target as HTMLElement).closest('.burger-trigger')) return;
    setIsOpen(false);
  });
  

  const content = {
    ru: { home: 'Главная', schedule: 'Расписание', grades: 'Оценки', title: 'Лицей 134', login: 'Вход', profile: 'Профиль' },
    kz: { home: 'Басты бет', schedule: 'Кесте', grades: 'Бағалар', title: '134 Лицей', login: 'Кіру', profile: 'Профиль' },
    en: { home: 'Home', schedule: 'Schedule', grades: 'Grades', title: 'Lyceum 134', login: 'Login', profile: 'Profile' },
  };

  const t = content[language];

  const navLinks = [
    { name: t.home, path: '/' },
    { name: t.schedule, path: '/schedule' },
    { name: t.grades, path: '/grades' },
  ];

  // Выносим кнопку профиля/входа в переменную, чтобы не дублировать логику условий
  const AuthActionBtn = () => 
    !uid ? <LoginBtn theme={theme} login={t.login} /> : <ProfileBtn theme={theme} profile={t.profile} />;

  return (
    <>
      {/* Шапка (z-50 — стандарт для фиксированных шапок) */}
      <header className={`
        sticky top-0 z-50 w-full border-b backdrop-blur-xl px-4 sm:px-6 py-4 transition-all duration-100 mx-auto flex items-center justify-between
        ${theme === 'light' 
          ? 'bg-white/80 border-sky-100 text-slate-600' 
          : 'bg-[#0b0f1a] border-slate-800/60 text-slate-400'}
      `}>
        
        {/* Логотип */}
        <Link to="/" className="flex items-center gap-2">
          <div className={`p-1.5 rounded-lg transition-colors duration-100 ${
            theme === 'light' ? 'bg-sky-50 text-sky-600' : 'bg-sky-500/10 text-sky-400'
          }`}>
            <GraduationCap size={24} />
          </div>
          <span className={`font-bold text-xl tracking-tight transition-colors duration-100 ${
            theme === 'light' ? 'text-slate-900' : 'text-slate-100'
          }`}>
            {t.title}
          </span>
        </Link>

        {/* Навигация (Desktop) */}
        <nav className="hidden md:flex items-center gap-2">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-100
                ${location.pathname === link.path 
                  ? (theme === 'light' ? 'bg-sky-50 text-sky-600' : 'bg-slate-800/50 text-sky-400')
                  : 'hover:text-sky-500 hover:bg-slate-500/5'}
              `}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Правая часть шапки */}
        <div className="flex items-center gap-3 md:gap-6">
          {/* Язык (Desktop) */}
          <div className="hidden sm:flex items-center gap-2 group">
            <Globe size={16} className="text-slate-600" />
            <select 
              value={language}
              onChange={(e) => setLanguage(e.target.value as any)}
              className={`bg-transparent text-xs font-bold focus:outline-none cursor-pointer uppercase tracking-widest opacity-80 hover:opacity-100 transition-opacity 
              ${theme === 'light' ? 'text-black' : 'text-slate-300'}`}
            >
              <option value="ru" className={theme === 'dark' ? 'bg-[#0b0f1a]' : ''}>RU</option>
              <option value="kz" className={theme === 'dark' ? 'bg-[#0b0f1a]' : ''}>KZ</option>
              <option value="en" className={theme === 'dark' ? 'bg-[#0b0f1a]' : ''}>EN</option>
            </select>
          </div>

          {/* Переключатель темы */}
          <button 
            onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
            className={`relative w-10 h-10 flex items-center justify-center rounded-xl transition-all active:scale-90 ${
              theme === 'light' ? 'bg-slate-100 text-slate-600' : 'bg-slate-800/50 text-yellow-400'
            }`}
          >
            {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
          </button>

          {/* Кнопка авторизации (Desktop) */}
          <div className="hidden sm:block">
            <AuthActionBtn />
          </div>

          {/* Бургер-кнопка (Mobile) */}
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className={`burger-trigger md:hidden flex flex-col items-center justify-center w-10 h-10 rounded-xl transition-colors relative z-50 ${
              theme === 'light' ? 'bg-slate-100' : 'bg-slate-800/50'
            }`}
          >
            {/* Линии бургера/Анимиронный крестик */}
            <div className={`w-5 h-0.5 mb-1 transition-all duration-100 ${theme === 'light' ? 'bg-slate-900' : 'bg-white'} ${isOpen ? 'rotate-45 translate-y-1.5' : ''}`} />
            <div className={`w-5 h-0.5 transition-all duration-100 ${theme === 'light' ? 'bg-slate-900' : 'bg-white'} ${isOpen ? 'opacity-0' : ''}`} />   {/* убираем, а остальные линии поворачиваем */}
            <div className={`w-5 h-0.5 mt-1 transition-all duration-100 ${theme === 'light' ? 'bg-slate-900' : 'bg-white'} ${isOpen ? '-rotate-45 -translate-y-1.5' : ''}`} />
          </button>
        </div>
      </header>

      {/* Мобильное меню (Drawer) */}
      {/* Оверлей фонового затемнения */}
      <div className={`
        fixed inset-0 z-40 md:hidden bg-black/40 backdrop-blur-sm transition-opacity duration-200
        ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}
      `} />
      
      {/* Выезжающая панель контента */}
      <div 
        ref={mobileMenuRef}
        className={`
          fixed right-0 top-0 h-full w-[280px] z-45 md:hidden border-l p-6 pt-24 flex flex-col transition-transform duration-200 ease-in-out
          ${isOpen ? 'translate-x-0' : 'translate-x-full'}
          ${theme === 'light' ? 'bg-white border-sky-100 text-slate-900' : 'bg-[#0b0f1a] border-slate-800/60 text-slate-100'}
        `}
      >
        <nav className="space-y-4">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`block p-4 rounded-xl text-xl font-bold transition-all ${
                location.pathname === link.path 
                  ? (theme === 'light' ? 'bg-sky-50 text-sky-600' : 'bg-sky-500/10 text-sky-400')
                  : 'opacity-50'
              }`}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        <div className="mt-auto pt-10 space-y-6">
          <div className={`p-4 rounded-2xl ${theme === 'light' ? 'bg-slate-50' : 'bg-white/5'}`}>
            <p className="text-[10px] uppercase tracking-widest font-bold opacity-40 mb-3 text-slate-500">Язык системы</p>
            <div className="flex gap-4">
              {['ru', 'kz', 'en'].map((lang) => (
                <button
                  key={lang}
                  onClick={() => setLanguage(lang as any)}
                  className={`text-sm font-black uppercase transition-colors ${language === lang ? 'text-sky-500' : 'opacity-30'}`}
                >
                  {lang}
                </button>
              ))}
            </div>
          </div>

          {/* Кнопка авторизации в мобильной версии (показывается на экранах меньше sm) */}
          <div className="sm:hidden">
            <AuthActionBtn />
          </div>
        </div>
      </div>
    </>
  );
}