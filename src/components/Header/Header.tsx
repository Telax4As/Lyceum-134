import { useState, useEffect } from 'react';
import { useAppStore } from '../../store/useAppStore';
import { Sun, Moon, Globe, GraduationCap } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { LoginBtn } from './LoginBtn';
import { ProfileBtn } from './ProfileBtn';

export default function GuestHeader() {
  const { role, theme, language, setTheme, setLanguage } = useAppStore();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  // Закрываем меню при смене пути
  useEffect(() => setIsOpen(false), [location]);

  const content = {
    ru: { home: 'Главная', schedule: 'Расписание', grades: 'Оценки', title: 'Лицей 134' },
    kz: { home: 'Басты бет', schedule: 'Кесте', grades: 'Бағалар', title: '134 Лицей' },
    en: { home: 'Home', schedule: 'Schedule', grades: 'Grades', title: 'Lyceum 134' },
  };

  const t = content[language];

  const navLinks = [
    { name: t.home, path: '/' },
    { name: t.schedule, path: '/schedule' },
    { name: t.grades, path: '/grades' },
  ];

  return (
    <>
      <header className={`
        sticky top-0 z-[60] w-full border-b backdrop-blur-xl px-4 sm:px-6 py-4 transition-all duration-300
        ${theme === 'light' 
          ? 'bg-white/80 border-sky-100 text-slate-600' 
          : 'bg-[#0b0f1a] border-slate-800/60 text-slate-400'}
      `}>
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          
          {/* Логотип */}
          <Link to="/" className="flex items-center gap-2 z-[70]">
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

          <div className="flex items-center gap-3 md:gap-6">
            {/* Язык (Desktop) */}
            <div className="hidden sm:flex items-center gap-2 group">
              <Globe size={16} className="text-slate-500" />
              <select 
                value={language}
                onChange={(e) => setLanguage(e.target.value as any)}
                className={`bg-transparent text-xs font-bold focus:outline-none cursor-pointer uppercase tracking-widest opacity-70 hover:opacity-100 transition-opacity 
                ${theme === 'light' ? 'text-slate-900' : 'text-slate-300'}`}
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

            <div className="hidden xs:block">
              {role === 'guest' ? <LoginBtn /> : <ProfileBtn />}
            </div>

            {/* Бургер (Анимированный через div) */}
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className={`md:hidden flex flex-col items-center justify-center w-10 h-10 rounded-xl z-[70] transition-colors ${
                theme === 'light' ? 'bg-slate-100' : 'bg-slate-800/50'
              }`}
            >
              <div className={`w-5 h-0.5 mb-1 transition-all duration-300 ${
                theme === 'light' ? 'bg-slate-900' : 'bg-white'
              } ${isOpen ? 'rotate-45 translate-y-1.5' : ''}`} />
              <div className={`w-5 h-0.5 transition-all duration-300 ${
                theme === 'light' ? 'bg-slate-900' : 'bg-white'
              } ${isOpen ? 'opacity-0' : ''}`} />
              <div className={`w-5 h-0.5 mt-1 transition-all duration-300 ${
                theme === 'light' ? 'bg-slate-900' : 'bg-white'
              } ${isOpen ? '-rotate-45 -translate-y-1.5' : ''}`} />
            </button>
            <div className="hidden min-[768px]:block">
              {role === 'guest' ? <LoginBtn /> : <ProfileBtn />}
            </div>
          </div>
        </div>
      </header>

      {/* Мобильное меню (Drawer) */}
      <div className={`
        fixed inset-0 z-[55] md:hidden transition-all duration-500
        ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}
        `}>
        {/* Оверлей (Прозрачный, только для закрытия по клику вне меню) */}
        <div 
          className="absolute inset-0 bg-transparent" 
          onClick={() => setIsOpen(false)} 
        />
        
        {/* Контент (Без блюра и теней) */}
        <div className={`
          absolute right-0 top-0 h-full w-[280px] border-l transition-transform duration-500 p-6 pt-24 flex flex-col
          ${isOpen ? 'translate-x-0' : 'translate-x-full'}
          ${theme === 'light' 
            ? 'bg-white border-sky-100 text-slate-900' 
            : 'bg-[#0b0f1a] border-slate-800/60 text-slate-100'}
          `}>
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
                {['ru', 'kz', 'en'].map((l) => (
                  <button
                    key={l}
                    onClick={() => setLanguage(l as any)}
                    className={`text-sm font-black uppercase transition-colors ${language === l ? 'text-sky-500' : 'opacity-30'}`}
                  >
                    {l}
                  </button>
                ))}
              </div>
            </div>

            <div className="xs:hidden">
              {role === 'guest' ? <LoginBtn /> : <ProfileBtn />}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}