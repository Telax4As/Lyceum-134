import { useAppStore } from '../../store/useAppStore';
import { Sun, Moon, Globe, LogIn } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function GuestHeader() {
  // Извлекаем данные и функции именно так, как они называются в твоем AppState
  const { theme, language, setTheme, setLanguage } = useAppStore();

  // Ключи теперь в нижнем регистре, чтобы соответствовать стору: 'ru' | 'kz' | 'en'
  const content = {
    ru: { about: 'О нас', news: 'Новости', reviews: 'Отзывы', login: 'Вход', title: 'Лицей №134' },
    kz: { about: 'Біз туралы', news: 'Жаңалықтар', reviews: 'Пікірлер', login: 'Кіру', title: '№134 Лицей' },
    en: { about: 'About Us', news: 'News', reviews: 'Reviews', login: 'Login', title: 'Lyceum №134' },
  };

  // Динамически получаем контент на основе текущего языка
  const t = content[language];

  // Функция для удобного переключения темы
  const handleThemeToggle = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  // Функция для плавного скролла
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      // Вычисляем отступ, чтобы хедер не перекрывал заголовок секции
      const offset = 80; 
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <header className={`
      sticky top-0 z-50 w-full transition-colors duration-300
      ${theme === 'light' ? 'bg-white/80 border-blue-100 text-blue-900' : 'bg-slate-900 border-blue-900 text-blue-100'}
      backdrop-blur-md border-b px-6 py-3
    `}>
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* Логотип */}
        <Link 
          to='/' 
          className="flex items-center gap-3 cursor-pointer"
          onClick={(e) => {
            // Если мы уже на главной странице, отменяем стандартный переход и скроллим
            if (window.location.pathname === '/') {
              e.preventDefault();
              // Используем твою же функцию scrollToSection
              scrollToSection('hero'); 
            }
          }}
        >
          <span className="font-bold text-xl tracking-tight hidden md:block">
            {t.title}
          </span>
        </Link>

        <nav className="flex items-center gap-8">
          {/* Навигация */}
          <ul className="hidden md:flex items-center gap-6 font-medium">
            <li className="hover:text-blue-500 transition-colors cursor-pointer" onClick={() => scrollToSection('about')}>
              {t.about}
            </li>
            <li className="hover:text-blue-500 transition-colors cursor-pointer" onClick={() => scrollToSection('news')}>
              {t.news}
            </li>
            <li className="hover:text-blue-500 transition-colors cursor-pointer" onClick={() => scrollToSection('reviews')}>
              {t.reviews}
            </li>
          </ul>

          <div className="h-6 w-[1px] bg-blue-200 hidden md:block" />

          <div className="flex items-center gap-4">
            {/* Выбор языка */}
            <div className="flex items-center gap-1">
              <Globe size={18} className="text-blue-500" />
              <select 
                value={language}
                onChange={(e) => setLanguage(e.target.value as 'ru' | 'kz' | 'en')}
                className="bg-transparent text-sm font-semibold focus:outline-none cursor-pointer uppercase"
              >
                <option value="ru" className={theme === 'dark' ? 'bg-slate-800' : ''}>RU</option>
                <option value="kz" className={theme === 'dark' ? 'bg-slate-800' : ''}>KZ</option>
                <option value="en" className={theme === 'dark' ? 'bg-slate-800' : ''}>EN</option>
              </select>
            </div>

            {/* Переключатель темы */}
            <button 
              onClick={handleThemeToggle}
              className={`p-2 rounded-full transition-all duration-300 ${
                theme === 'light' ? 'bg-blue-50 text-blue-600 hover:bg-blue-100' : 'bg-slate-800 text-yellow-400 hover:bg-slate-700'
              }`}
            >
              {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
            </button>
          </div>
        </nav>

        {/* Кнопка входа */}
        <button className={`
          flex items-center gap-2 px-5 py-2 rounded-full font-semibold transition-all
          ${theme === 'light' 
            ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-md shadow-blue-200' 
            : 'bg-blue-500 text-white hover:bg-blue-400 shadow-md shadow-blue-900/40'}
        `}>
          <LogIn size={18} />
          <span>{t.login}</span>
        </button>
      </div>
    </header>
  );
}