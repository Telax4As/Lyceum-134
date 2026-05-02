import React from 'react';
import { useNavigate } from 'react-router-dom'; // Добавил для навигации
import { useAppStore } from '../store/useAppStore';
import { newsData } from '../Data';
import { ArrowRight, Newspaper, GraduationCap, Users, BookOpen } from 'lucide-react';

const HomePage: React.FC = () => {
  const { setRole, theme, language } = useAppStore();
  const navigate = useNavigate();

  const pageContent = {
    ru: {
      heroTitle: 'Лицей №134',
      heroSub: 'Пространство для тех, кто стремится к высоким достижениям в точных науках и технологиях.',
      aboutTitle: 'О лицее',
      aboutSub: 'Лицей №134 в Алматы — это специализированная школа с углубленным изучением физики и математики. Мы фокусируемся на качественной подготовке к ЕНТ и NUET, создавая условия для поступления в лучшие технические вузы.',
      newsTitle: 'События',
      more: 'Подробнее',
      stats: [
        { label: 'Учеников', value: '800+', icon: Users },
        { label: 'Педагогов', value: '60+', icon: GraduationCap },
        { label: 'Лет', value: '30+', icon: BookOpen },
      ]
    },
    kz: {
      heroTitle: '№134 лицей',
      heroSub: 'Нақты ғылымдар мен технологиялар саласында жоғары жетістіктерге ұмтылатындарға арналған кеңістік.',
      aboutTitle: 'Лицей туралы',
      aboutSub: 'Алматыдағы №134 лицей — физика мен математиканы тереңдетіп оқытатын мамандандырылған мектеп. Біз ҰБТ мен НҰБТ-ға сапалы дайындыққа баса назар аударамыз.',
      newsTitle: 'Жаңалықтар',
      more: 'Толығырақ',
      stats: [
        { label: 'Оқушылар', value: '800+', icon: Users },
        { label: 'Мұғалімдер', value: '60+', icon: GraduationCap },
        { label: 'Жыл', value: '30+', icon: BookOpen },
      ]
    },
    en: {
      heroTitle: 'Lyceum №134',
      heroSub: 'A space for those striving for high achievements in exact sciences and technology.',
      aboutTitle: 'About Us',
      aboutSub: 'Lyceum No. 134 in Almaty is a specialized school with in-depth study of physics and mathematics. We focus on high-quality preparation for UNT and NUET.',
      newsTitle: 'News',
      more: 'Read more',
      stats: [
        { label: 'Students', value: '800+', icon: Users },
        { label: 'Faculty', value: '60+', icon: GraduationCap },
        { label: 'Years', value: '30+', icon: BookOpen },
      ]
    }
  };

  const t = pageContent[language];

  return (
    <main className={`min-h-screen transition-colors duration-200 pb-16 md:pb-24 ${
      theme === 'light' ? 'bg-[#fcfcfd] text-slate-900' : 'bg-[#0b0f1a] text-slate-200'
    }`}>
      
      {/* HERO SECTION */}
      <section className="relative pt-20 pb-16 md:pt-32 md:pb-24 px-6 overflow-hidden">
        <div className="max-w-6xl mx-auto flex flex-col items-center relative z-10">
          <div className={`absolute top-[-20%] left-1/2 -translate-x-1/2 w-[300px] md:w-[600px] h-[200px] md:h-[300px] blur-[80px] md:blur-[120px] rounded-full opacity-30 -z-10 ${
            theme === 'light' ? 'bg-sky-300' : 'bg-blue-600/20'
          }`} />  

          <h1 className={`text-4xl sm:text-5xl md:text-7xl font-black text-center max-w-4xl mb-6 leading-[1.1] tracking-tight transition-colors ${
            theme === 'light' ? 'text-slate-900' : 'text-white'
          }`}>
            {t.heroTitle}
          </h1>

          <p className="text-base md:text-xl opacity-70 text-center max-w-2xl mb-10 leading-relaxed">
            {t.heroSub}
          </p>

          <button 
            onClick={() => navigate('/login')}
            className="w-full sm:w-auto px-10 py-4 rounded-2xl bg-sky-600 text-white font-bold hover:bg-sky-700 transition-all active:scale-95 shadow-lg shadow-sky-500/20"
          >
            Войти в систему
          </button>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-6 space-y-16 md:space-y-28">
        
        {/* STATS - Адаптивная сетка: 1 колонка на мобайле, 3 на десктопе */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {t.stats.map((stat, idx) => (
            <div key={idx} className={`p-6 md:p-8 rounded-[2rem] border transition-all ${
              theme === 'light' ? 'bg-white border-slate-100 shadow-sm' : 'bg-slate-900/40 border-slate-800'
            }`}>
              <stat.icon size={24} className="text-sky-500 mb-4" />
              <div className="text-2xl md:text-3xl font-black mb-1">{stat.value}</div>
              <div className="text-[10px] font-bold uppercase tracking-widest opacity-40">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* ABOUT - Уменьшил паддинги для мобилок */}
        <section className={`p-8 md:p-16 rounded-[2.5rem] md:rounded-[3rem] border transition-colors ${
          theme === 'light' ? 'bg-white border-slate-100 shadow-sm' : 'bg-slate-900/40 border-slate-800'
        }`}>
          <div className="max-w-3xl">
            <h2 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6">{t.aboutTitle}</h2>
            <p className="text-base md:text-lg opacity-60 leading-relaxed mb-8">
              {t.aboutSub}
            </p>
            {/* Теги теперь скроллятся горизонтально на очень маленьких экранах, чтобы не ломать верстку */}
            <div className="flex flex-wrap items-center gap-3 md:gap-6">
              {['МФИ', 'Химики', 'ГеоМат'].map(tag => (
                <div key={tag} className="px-4 py-2 rounded-xl bg-sky-500/10 text-sky-500 text-xs md:text-sm font-bold">
                  {tag}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* NEWS - Сетка 1 -> 2 -> 3 колонки */}
        <section>
          <div className="flex items-center justify-between mb-8 md:mb-12">
            <h2 className="text-xl md:text-2xl font-bold flex items-center gap-3">
              <Newspaper size={24} className="text-sky-500" />
              {t.newsTitle}
            </h2>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {newsData.slice(0, 3).map((item) => (
              <article 
                key={item.id} 
                className={`flex flex-col h-full group rounded-[2rem] md:rounded-[2.5rem] border overflow-hidden transition-all duration-300 ${
                  theme === 'light' 
                    ? 'bg-white border-slate-200 hover:shadow-xl' 
                    : 'bg-slate-900/40 border-slate-800 hover:bg-slate-900/60'
                }`}
              >
                <div className="relative h-48 md:h-56 overflow-hidden">
                  <img 
                    src={item.image} 
                    alt={item.title[language]} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute top-4 left-4">
                    <span className={`px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-wider ${
                      theme === 'light' ? 'text-slate-900 bg-white/90' : 'text-slate-300 bg-slate-900/90'
                    }`}>
                      {item.date}
                    </span>
                  </div>
                </div>

                <div className="flex flex-col flex-grow p-6 md:p-8">
                  <h3 className={`text-lg md:text-xl font-bold mb-3 line-clamp-2 leading-tight ${
                    theme === 'light' ? 'text-slate-900' : 'text-white'
                  }`}>
                    {item.title[language]}
                  </h3>
                  
                  <p className="text-sm opacity-50 mb-6 line-clamp-3 md:line-clamp-2">
                    {item.description[language]}
                  </p>
                  
                  <div className="mt-auto pt-4 border-t border-slate-100 dark:border-slate-800">
                    <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-sky-600">
                      {t.more} 
                      <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

      </div>
    </main>
  );
};

export default HomePage;