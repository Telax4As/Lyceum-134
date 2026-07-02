import React from 'react';
import { useNavigate } from 'react-router-dom'; 
import { useAppStore } from '../../store/useAppStore';
import { Newspaper } from 'lucide-react';

import { content } from './datas/HomePageContent';
import { newsData } from './datas/NewsData';

import { StatCard } from './ui/StatCard';
import { NewsCard } from './ui/NewsCard';


const HomePage: React.FC = () => {
  const { theme, language, uid } = useAppStore();
  const navigate = useNavigate();

  const text = content[language];

  return (
    <main className={`min-h-screen transition-colors duration-100 pb-16 md:pb-24 ${
      theme === 'light' ? 'bg-[#fcfcfd] text-slate-900' : 'bg-[#0b0f1a] text-slate-200'
    }`}>
      
      {/* 1. HERO SECTION */}
      <section className="relative pt-30 pb-19 md:pt-42 md:pb-34 px-6 overflow-hidden">
        <div className="max-w-6xl mx-auto flex flex-col items-center relative z-10">
          <div className={`duration-100 absolute top-[-20%] left-1/2 -translate-x-1/2 w-[300px] md:w-[600px] h-[200px] md:h-[300px] blur-[80px] md:blur-[120px] rounded-full opacity-30 -z-10 ${
            theme === 'light' ? 'bg-sky-300' : 'bg-blue-600/20'
          }`} />  

          <h1 className={`text-4xl sm:text-5xl md:text-7xl font-black text-center max-w-4xl mb-6 leading-[1.1] tracking-tight transition-colors ${
            theme === 'light' ? 'text-slate-900' : 'text-white'
          }`}>
            {text.heroTitle}
          </h1>

          <p className="text-base md:text-xl opacity-70 text-center max-w-2xl mb-10 leading-relaxed">
            {text.heroSub}
          </p>

          {!uid && <button 
            onClick={() => navigate('/login')}
            className="w-full sm:w-auto px-10 py-4 rounded-2xl bg-sky-600 text-white font-bold hover:bg-sky-700 transition-all active:scale-95 shadow-lg shadow-sky-500/20"
          >
            Войти в систему
          </button>
        }
        </div>
      </section>

      {/* 2. STATS SECTION */}
      <section className="py-8 md:py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {text.stats.map((stat, idx) => (
              <StatCard key={idx} theme={theme} Icon={stat.icon} value={stat.value} label={stat.label} />
            ))}
          </div>
        </div>
      </section>

      {/* 3. ABOUT SECTION */}
      <section className="py-8 md:py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <div className={`p-8 md:p-16 rounded-[2.5rem] md:rounded-[3rem] border transition-colors ${
            theme === 'light' ? 'bg-white border-slate-100 shadow-sm' : 'bg-slate-900/40 border-slate-800'
          }`}>
            <div className="max-w-3xl">
              <h2 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6">{text.aboutTitle}</h2>
              <p className="text-base md:text-lg opacity-60 leading-relaxed mb-8">
                {text.aboutSub}
              </p>
              <div className="flex flex-wrap items-center gap-3 md:gap-6">
                {['МФИ', 'Химики', 'ГеоМат'].map(tag => (
                  <div key={tag} className="px-4 py-2 rounded-xl bg-sky-500/10 text-sky-500 text-xs md:text-sm font-bold">
                    {tag}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. NEWS SECTION */}
      <section className="py-12 md:py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-8 md:mb-12">
            <h2 className="text-xl md:text-2xl font-bold flex items-center gap-3">
              <Newspaper size={24} className="text-sky-500" />
              {text.newsTitle}
            </h2>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {newsData.slice(0, 3).map((item) => (
              <NewsCard key={item.id} item={item} theme={theme} language={language} tmore={text.more} />
            ))}
          </div>
        </div>
      </section>

    </main>
  );
};

export default HomePage;