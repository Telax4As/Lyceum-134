import { useAppStore } from '../store/useAppStore';
import { Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  const { theme, language } = useAppStore();

  const content = {
    ru: {
      about: 'Специализированный лицей города Алматы. Мы готовим будущих лидеров в области IT и естественных наук.',
      nav: 'Навигация',
      contacts: 'Контакты',
      socials: 'Мы в соцсетях',
      links: ['Главная', 'Контакты', 'Новости', 'Отзывы'],
      address: 'г. Алматы, ул. Жарокова 24',
      rights: 'Все права защищены.',
    },
    kz: {
      about: 'Алматы қаласының мамандандырылған лицейі. Біз IT және жаратылыстану ғылымдары саласындағы болашақ көшбасшыларды дайындаймыз.',
      nav: 'Навигация',
      contacts: 'Байланыс',
      socials: 'Әлеуметтік желілер',
      links: ['Басты бет', 'Контакты', 'Новости', 'Отзывы'],
      address: 'Алматы қ., Жарокова к-сі 24',
      rights: 'Барлық құқықтар қорғалған.',
    },
    en: {
      about: 'Specialized lyceum in Almaty. We prepare future leaders in IT and natural sciences.',
      nav: 'Navigation',
      contacts: 'Contacts',
      socials: 'Social Media',
      links: ['Home', 'Contacts', 'News', 'Reviews'],
      address: '24 Zharokova St., Almaty',
      rights: 'All rights reserved.',
    }
  };

  const t = content[language];
  const currentYear = new Date().getFullYear();

  // Кастомные SVG для соцсетей
  const SocialIcons = {
    Instagram: () => (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
    ),
    Facebook: () => (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
    )
  };

  return (
    <footer className={`w-full border-t transition-colors duration-300 ${
      theme === 'light' ? 'bg-white border-blue-100 text-slate-600' : 'bg-slate-950 border-slate-800 text-slate-400'
    }`}>
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          
          {/* О лицее */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center text-white font-bold shadow-lg shadow-blue-500/20">
                134
              </div>
              <span className={`text-xl font-bold ${theme === 'light' ? 'text-slate-900' : 'text-white'}`}>
                Liceum 134
              </span>
            </div>
            <p className="text-sm leading-relaxed italic">
              {t.about}
            </p>
          </div>

          {/* Навигация в Футере */}
          <div className="pl-0 md:pl-15">
            <h3 className={`font-bold mb-4 ${theme === 'light' ? 'text-slate-900' : 'text-white'}`}>
              {t.nav}
            </h3>
            <ul className="space-y-2 text-sm">
              {/* Массив объектов с названиями и ID секций */}
              {[
                { name: t.links[0], id: 'hero' },    // Главная
                { name: t.links[1], id: 'about' }, // Контакты
                { name: t.links[2], id: 'news' },    // Новости
                { name: t.links[3], id: 'reviews' }   // Отзывы
              ].map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => {
                      const element = document.getElementById(item.id);
                      if (element) {
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
                    }}
                    className="hover:text-blue-500 transition-colors flex items-center gap-1 bg-transparent border-none p-0 cursor-pointer text-left"
                  >
                    {item.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Контакты */}
          <div>
            <h3 className={`font-bold mb-4 ${theme === 'light' ? 'text-slate-900' : 'text-white'}`}>{t.contacts}</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-3">
                <Phone size={16} className="text-blue-500" />
                <span>+7 (727) 123-45-67</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={16} className="text-blue-500" />
                <span>info@liceum134.kz</span>
              </li>
              <li className="flex items-start gap-3">
                <MapPin size={16} className="text-blue-500 mt-1" />
                <span>{t.address}</span>
              </li>
            </ul>
          </div>

          {/* Соцсети */}
          <div>
            <h3 className={`font-bold mb-4 ${theme === 'light' ? 'text-slate-900' : 'text-white'}`}>{t.socials}</h3>
            <div className="flex gap-3">
              <a href="#" className={`p-2.5 rounded-xl transition-all ${
                theme === 'light' ? 'bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white' : 'bg-slate-900 text-blue-400 hover:bg-blue-600 hover:text-white'
              }`}>
                <SocialIcons.Instagram />
              </a>
              <a href="#" className={`p-2.5 rounded-xl transition-all ${
                theme === 'light' ? 'bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white' : 'bg-slate-900 text-blue-400 hover:bg-blue-600 hover:text-white'
              }`}>
                <SocialIcons.Facebook />
              </a>
            </div>
          </div>

        </div>

        {/* Подвал */}
        <div className={`mt-12 pt-8 border-t flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] font-bold uppercase tracking-[0.2em] ${
          theme === 'light' ? 'border-slate-100 text-slate-400' : 'border-slate-900 text-slate-600'
        }`}>
          <p>© {currentYear} Liceum №134. {t.rights}</p>
          <div className="flex gap-8">
            <a href="#" className="hover:text-blue-500 transition-colors tracking-widest">Privacy</a>
            <a href="#" className="hover:text-blue-500 transition-colors tracking-widest">Rules</a>
          </div>
        </div>
      </div>
    </footer>
  );
}