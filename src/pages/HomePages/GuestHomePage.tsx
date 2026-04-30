import React from 'react';
import { useAppStore } from '../../store/useAppStore';
import { newsData, reviewsData } from '../../Data';
import { ArrowRight, MessageSquare, Newspaper, GraduationCap, Users, Trophy, BookOpen } from 'lucide-react';

const HomePage: React.FC = () => {
  const { theme, language } = useAppStore();

  const pageContent = {
    ru: {
      heroTitle: 'Добро пожаловать в Лицей №134',
      heroSub: 'Твое будущее начинается здесь. Лучшее образование в сердце Алматы.',
      aboutTitle: 'О нашем лицее',
      aboutSub: 'Лицей №134 — это сообщество талантливых учеников и опытных педагогов. Лицей славится своей углубленной программой, подготовкой к ЕНТ и NUET, а также активной студенческой жизнью. Здесь мы развиваем не только интеллект, но и творческий потенциал.',
      newsTitle: 'Последние новости',
      reviewsTitle: 'Отзывы учеников',
      more: 'Подробнее',
      stats: [
        { label: 'Учеников', value: '800+', icon: Users },
        { label: 'Преподавателей', value: '60+', icon: GraduationCap },
        { label: 'Призовых мест', value: '150+', icon: Trophy },
        { label: 'Лет истории', value: '30+', icon: BookOpen },
      ]
    },
    kz: {
      heroTitle: '№134 лицейге қош келдіңіздер',
      heroSub: 'Сенің болашағың осы жерден басталады. Алматы жүрегіндегі үздік білім.',
      aboutTitle: 'Лицей туралы',
      aboutSub: 'No134 лицей – дарынды оқушылар мен тәжірибелі ұстаздар қауымы. Лицей тереңдетілген оқу бағдарламасымен, ҰБТ мен НҰБТ-ға дайындықпен және белсенді студенттік өмірімен танымал. Мұнда біз тек интеллектті ғана емес, шығармашылықты да дамытамыз.',
      newsTitle: 'Соңғы жаңалықтар',
      reviewsTitle: 'Оқушылардың пікірлері',
      more: 'Толығырақ',
      stats: [
        { label: 'Оқушылар', value: '800+', icon: Users },
        { label: 'Мұғалімдер', value: '60+', icon: GraduationCap },
        { label: 'Жүлделі орындар', value: '150+', icon: Trophy },
        { label: 'Жыл тарихы', value: '30+', icon: BookOpen },
      ]
    },
    en: {
      heroTitle: 'Welcome to Lyceum №134',
      heroSub: 'Your future starts here. The best education in the heart of Almaty.',
      aboutTitle: 'About our Lyceum',
      aboutSub: 'Lyceum No. 134 is a community of talented students and experienced teachers. The Lyceum is renowned for its in-depth curriculum, preparation for the UNT and NUET, and its active student life. Here, we develop not only intellect but also creativity.',
      newsTitle: 'Latest News',
      reviewsTitle: 'Student Reviews',
      more: 'Learn More',
      stats: [
        { label: 'Students', value: '800+', icon: Users },
        { label: 'Teachers', value: '60+', icon: GraduationCap },
        { label: 'Awards', value: '150+', icon: Trophy },
        { label: 'Years of History', value: '30+', icon: BookOpen },
      ]
    }
  };

  const t = pageContent[language];

  return (
    <main className={`min-h-screen transition-colors duration-300 ${
      theme === 'light' ? 'bg-slate-50 text-slate-900' : 'bg-slate-950 text-slate-100'
    }`}>
      
      {/* --- HERO BLOCK --- */}
      <section className="relative overflow-hidden py-24 px-6">
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <h1 className="text-5xl md:text-7xl font-extrabold mb-6 tracking-tight">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-cyan-400">
              {t.heroTitle}
            </span>
          </h1>
          <p className="text-lg md:text-xl max-w-2xl mx-auto mb-10 opacity-80">
            {t.heroSub}
          </p>
        </div>
        <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] blur-[120px] rounded-full opacity-20 -z-0 ${
          theme === 'light' ? 'bg-blue-400' : 'bg-blue-800'
        }`} />
      </section>

      {/* --- NEW: ABOUT / STATS SECTION --- */}
      <section className="py-12 px-6 max-w-7xl mx-auto">
        <div className={`p-8 md:p-12 rounded-[2.5rem] border transition-all ${
          theme === 'light' 
          ? 'bg-white border-blue-100 shadow-sm' 
          : 'bg-slate-900 border-slate-800 shadow-2xl'
        }`}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 italic">{t.aboutTitle}</h2>
              <p className="text-lg opacity-70 leading-relaxed mb-8">
                {t.aboutSub} 
              </p>
              <div className="flex gap-4">
                 <div className="w-70 h-1.5 bg-blue-600 rounded-full" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {t.stats.map((stat, idx) => (
                <div key={idx} className={`p-6 rounded-2xl ${theme === 'light' ? 'bg-blue-50/50' : 'bg-slate-800/50'}`}>
                  <stat.icon className="text-blue-500 mb-4" size={28} />
                  <div className="text-3xl font-bold mb-1">{stat.value}</div>
                  <div className="text-sm opacity-60 font-medium uppercase tracking-wider">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* --- NEWS FEED --- */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
        <div className="flex items-center gap-3 mb-12">
          <div className="p-2 bg-blue-600 rounded-lg text-white">
            <Newspaper size={24} />
          </div>
          <h2 className="text-3xl font-bold">{t.newsTitle}</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {newsData.map((item) => (
            <article 
              key={item.id} 
              className={`p-6 rounded-2xl border transition-all hover:border-blue-500 group ${
                theme === 'light' 
                ? 'bg-white border-slate-200 shadow-sm' 
                : 'bg-slate-900 border-slate-800 shadow-xl'
              }`}
            >
              <span className="text-sm font-bold text-blue-500 bg-blue-500/10 px-3 py-1 rounded-full">{item.date}</span>
              <h3 className="text-xl font-bold mt-4 mb-3">{item.title[language]}</h3>
              <p className="opacity-70 mb-6 line-clamp-3">{item.description[language]}</p>
              <button className="flex items-center gap-2 text-sm font-bold text-blue-600">
                {t.more} <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </article>
          ))}
        </div>
      </section>

      {/* --- REVIEWS SECTION --- */}
      <section className={`py-16 px-6 ${theme === 'light' ? 'bg-blue-50/50' : 'bg-slate-900/40'}`}>
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-12 justify-center">
            <MessageSquare className="text-blue-500" />
            <h2 className="text-3xl font-bold">{t.reviewsTitle}</h2>
          </div>

          {/* Используем grid вместо flex-wrap для более стабильной сетки */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {reviewsData.map((review) => (
              <div 
                key={review.id}
                className={`
                  flex flex-col relative p-8 rounded-3xl transition-all
                  ${theme === 'light' 
                    ? 'bg-white text-slate-800 shadow-lg shadow-blue-100' 
                    : 'bg-slate-800 text-slate-200 shadow-xl shadow-black/20'}
                `}
              >
                {/* Кавычка */}
                <div className="absolute -top-4 -left-2 w-10 h-10 bg-blue-600 rounded-2xl flex items-center justify-center text-white text-2xl shadow-lg rotate-12">
                  "
                </div>

                {/* Контейнер для текста: flex-grow заполнит пустоту, если текст короткий */}
                <div className="flex-grow">
                  <p className="italic text-lg leading-relaxed mb-6">
                    {review.text[language]}
                  </p>
                </div>

                {/* Имя: теперь всегда прижато к низу за счет flex-grow выше */}
                <div className={`mt-auto pt-4 border-t ${theme === 'light' ? 'border-blue-50' : 'border-slate-700'}`}>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-600 to-cyan-400 flex items-center justify-center text-[10px] font-bold text-white uppercase">
                      {review.name.slice(0, 2)}
                    </div>
                    <span className="font-bold tracking-wide">
                      {review.name}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

    </main>
  );
};

export default HomePage;