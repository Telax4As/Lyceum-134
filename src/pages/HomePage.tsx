import React from 'react';
import { useAppStore } from '../store/useAppStore';
import { newsData } from '../Data';
import { ArrowRight, Newspaper, GraduationCap, Users, BookOpen } from 'lucide-react';

const HomePage: React.FC = () => {
  const { theme, language } = useAppStore();

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
    /* ОПТИМИЗАЦИЯ: transition-colors вместо transition-all и уменьшение duration */
    <main className={`min-h-screen transition-colors duration-100 pb-24 ${
      theme === 'light' ? 'bg-[#fcfcfd] text-slate-900' : 'bg-[#0b0f1a] text-slate-200'
    }`}>
      
      <section className="relative pt-28 pb-20 px-6 overflow-hidden">
        <div className="max-w-6xl mx-auto flex flex-col items-center">
          {/* Фон: opacity снижена для облегчения рендеринга */}
          <div className={`absolute top-[-10%] left-1/2 -translate-x-1/2 w-[600px] h-[300px] blur-[120px] rounded-full opacity-20 -z-0 ${
            theme === 'light' ? 'bg-sky-200' : 'bg-sky-900/30'
          }`} />  

          <h1 className={`text-5xl md:text-7xl font-black text-center max-w-4xl mb-7 leading-[1.1] tracking-tight z-10 transition-colors duration-100 ${
            theme === 'light' ? 'text-slate-900' : 'text-white'
          }`}>
            {t.heroTitle}
          </h1>

          <p className="text-lg md:text-xl opacity-60 text-center max-w-4xl mb-12 leading-relaxed z-10">
            {t.heroSub}
          </p>

          <div className="flex gap-4 z-10">
            <a href="https://www.tiktok.com/@eugenius_official/video/7402982890889301253" 
               className="px-14 py-4 rounded-2xl bg-sky-600 text-white font-bold hover:bg-sky-700 transition-transform active:scale-95 shadow-lg shadow-sky-500/10">
              Поступить
            </a>
          </div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-6 space-y-28">
        
        {/* STATS */}
        <div className="grid grid-cols-3 gap-4 px-6">
          {t.stats.map((stat, idx) => (
            <div key={idx} className={`p-8 rounded-[2rem] border transition-colors duration-100 ${
              theme === 'light' ? 'bg-white border-slate-100 shadow-sm' : 'bg-slate-900/40 border-slate-800'
            }`}>
              <stat.icon size={24} className="text-sky-500 mb-4" />
              <div className="text-3xl font-black mb-1">{stat.value}</div>
              <div className="text-[10px] font-bold uppercase tracking-widest opacity-40">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* ABOUT */}
        <section className={`p-10 md:p-16 rounded-[3rem] border transition-colors duration-100 ${
          theme === 'light' ? 'bg-white border-slate-100 shadow-sm' : 'bg-slate-900/40 border-slate-800'
        }`}>
          <div className="max-w-3xl">
            <h2 className="text-3xl font-bold mb-6">{t.aboutTitle}</h2>
            <p className="text-lg opacity-60 leading-relaxed mb-8">
              {t.aboutSub}
            </p>
            <div className="flex items-center gap-6">
              {['МФИ', 'Химики', 'ГеоМат'].map(tag => (
                <div key={tag} className="px-4 py-2 rounded-xl bg-sky-500/10 text-sky-500 text-sm font-bold transition-colors">
                  {tag}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* NEWS */}
        <section>
          <div className="flex items-center justify-between mb-12 px-2">
            <h2 className="text-2xl font-bold flex items-center gap-3">
              <Newspaper size={24} className="text-sky-500" />
              {t.newsTitle}
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {newsData.slice(0, 3).map((item) => (
              <article 
                key={item.id} 
                /* ОПТИМИЗАЦИЯ: Убраны переходы для всей карточки, оставлены только для ховера */
                className={`flex flex-col h-full group rounded-[2.5rem] border overflow-hidden ${
                  theme === 'light' 
                    ? 'bg-white border-slate-200 hover:shadow-xl hover:shadow-sky-500/5' 
                    : 'bg-slate-900/40 border-slate-800 hover:shadow-2xl hover:shadow-black/40'
                } transition-[box-shadow,transform] duration-100`}
              >
                <div className="relative h-50 mb-6 overflow-hidden">
                  <img 
                    src={item.image} 
                    alt={item.title[language]} 
                    /* will-change-transform ускоряет анимацию на мобильных и слабых ПК */
                    className="w-full h-full object-cover transition-transform duration-100 group-hover:scale-110 will-change-transform"
                  />
                  <div className="absolute top-4 left-4 z-10">
                    <span className={`
                      px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider shadow-sm
                      ${theme === 'light' ? 'text-slate-900 bg-white/90' : 'text-slate-300 bg-slate-900/90'}`}
                    >
                      {item.date}
                    </span>
                  </div>
                </div>

                <div className="flex flex-col flex-grow px-6 pb-7">
                  <h3 className={`text-xl font-bold mb-3 h-[3.5rem] line-clamp-2 leading-tight transition-colors ${
                    theme === 'light' ? 'text-slate-900' : 'text-white group-hover:text-sky-400'
                  }`}>
                    {item.title[language]}
                  </h3>
                  
                  <p className="text-sm opacity-50 mb-6 h-[3rem] line-clamp-2 leading-relaxed">
                    {item.description[language]}
                  </p>
                  
                  <div className="mt-auto pt-4 border-t border-transparent group-hover:border-slate-100 dark:group-hover:border-slate-800 transition-colors">
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