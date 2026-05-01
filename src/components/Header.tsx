import { useAppStore } from '../store/useAppStore';
import { Sun, Moon, Globe, GraduationCap } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

export default function GuestHeader() {
  const { theme, language, setTheme, setLanguage } = useAppStore();
  const location = useLocation();

  const content = {
    ru: { home: 'Главная', schedule: 'Расписание', grades: 'Оценки', login: 'Вход', title: 'Лицей 134' },
    kz: { home: 'Басты бет', schedule: 'Кесте', grades: 'Бағалар', login: 'Кіру', title: '134 Лицей' },
    en: { home: 'Home', schedule: 'Schedule', grades: 'Grades', login: 'Login', title: 'Lyceum 134' },
  };

  const t = content[language];

  const navLinks = [
    { name: t.home, path: '/' },
    { name: t.schedule, path: '/schedule' },
    { name: t.grades, path: '/grades' },
  ];

  return (
    <header className={`
      sticky top-0 z-50 w-full border-b backdrop-blur-xl px-6 py-4
      transition-colors duration-100
      ${theme === 'light' 
        ? 'bg-white/80 border-sky-100 text-slate-600' 
        : 'bg-[#0b0f1a] border-slate-800/60 text-slate-400'}
    `}>
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* Логотип */}
        <div className="flex items-center gap-2 group cursor-pointer">
          <div className={`
            p-1.5 rounded-lg transition-colors duration-100
            ${theme === 'light' ? 'bg-sky-50 text-sky-600' : 'bg-sky-500/10 text-sky-400'}
          `}>
            <GraduationCap size={24} />
          </div>
          <span className={`font-bold text-xl tracking-tight transition-colors duration-100 ${
            theme === 'light' ? 'text-slate-900' : 'text-slate-100'
          }`}>
            {t.title}
          </span>
        </div>

        {/* Навигация */}
        <nav className="hidden md:flex items-center gap-2">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              /* duration-200 для плавности ховера, но без нагрузки при смене темы */
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

        <div className="flex items-center gap-6">
          {/* Язык */}
          <div className="flex items-center gap-2 group">
            <Globe size={16} className="text-slate-500" />
            <select 
              value={language}
              onChange={(e) => setLanguage(e.target.value as 'ru' | 'kz' | 'en')}
              className={`
                bg-transparent text-xs font-bold focus:outline-none cursor-pointer uppercase tracking-widest opacity-70 hover:opacity-100 transition-opacity   
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
            className={`
              relative w-10 h-10 flex items-center justify-center rounded-xl transition-colors duration-100
              ${theme === 'light' ? 'bg-slate-100 text-slate-600' : 'bg-slate-800/50 text-yellow-400'}
            `}
          >
            <Sun className={`absolute transition-all duration-300 ${theme === 'light' ? 'scale-0 rotate-90 opacity-0' : 'scale-100 rotate-0 opacity-100'}`} size={20} />
            <Moon className={`absolute transition-all duration-300 ${theme === 'dark' ? 'scale-0 -rotate-90 opacity-0' : 'scale-100 rotate-0 opacity-100'}`} size={20} />
          </button>

          {/* Кнопка входа */}
          <button className={`
            px-5 py-2 rounded-xl text-sm font-bold transition-all active:scale-95
            ${theme === 'light' 
              ? 'bg-sky-600 text-white hover:bg-sky-700 shadow-lg shadow-sky-200/50' 
              : 'bg-slate-100 text-slate-900 hover:bg-slate-200'}
          `}>
            {t.login}
          </button>
        </div>
      </div>
    </header>
  );
}