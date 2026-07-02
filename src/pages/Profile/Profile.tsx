import { useAppStore } from '../../store/useAppStore';
import { LogOut, Moon, Sun } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useProfile } from './hooks/useProfile';
import { Error } from '../ErrorPage';

import { content } from './data/ProfilePageContent';

export default function ProfileForStudents() {
  const { theme, setTheme, language, setLanguage, setRole, email, setUid, setEmail } = useAppStore();
  const navigate = useNavigate();


  const t = content[language];


  const { data: Data, error: profileError } = useProfile();

  const userData = Data 
    ? {
        fullName: Data.full_name,
        role: Data.role,
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=smartNiggas`,
      }
    : {
      fullName: t.loading,
      role: t.loading,
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=smartNiggas`,
    }; 
  const userEmail = email || t.unknown;


  const logout = () => {
    setUid(null);
    setEmail(undefined);
    setRole('guest');
    navigate('/login');
  };


  if (profileError) {
    return <Error message={`${t.errTitle}: ${profileError ? profileError.message : 'Данные не найдены'}`} />;
  }

  return (
    <main className={`min-h-screen w-full pt-16 md:pt-24 pb-12 transition-colors duration-100 ${
      theme === 'light' ? 'bg-white text-slate-900' : 'bg-[#0b0f1a] text-slate-100'
    }`}>
      <div className="max-w-2xl mx-auto px-4 sm:px-6">
        {userData && (
          <>
            {/* Адаптивный Header */}
            <header className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 mb-10 md:mb-14 text-center sm:text-left">
              <img 
                src={userData.avatar} 
                alt="Avatar" 
                className={`w-24 h-24 md:w-28 md:h-28 rounded-full object-cover border-4 border-transparent shadow-xl duration-100
                  ${theme === 'light' ? 'bg-slate-100' : 'bg-slate-800'
                }`} 
              />
              <div className="space-y-1">
                <h1 className="text-2xl md:text-3xl font-bold tracking-tight">{userData.fullName}</h1>
                <p className="text-sm md:text-base opacity-50 font-medium">
                  {t.school}
                </p>
              </div>
            </header>

            <div className="space-y-8 md:space-y-12">
              
              {/* Блок информации */}
              <section>
                <h2 className="text-[10px] md:text-[11px] uppercase tracking-[0.2em] opacity-40 font-bold mb-4 px-2">{t.info}</h2>
                <div className="space-y-1">
                  <div className={`flex justify-between items-center py-4 px-2 border-b duration-100
                    ${theme === 'light' ? 'border-slate-100' : 'border-white/5'
                  }`}>
                    <span className="text-sm opacity-60">Email</span>
                    <span className="text-xs md:text-sm font-bold px-2.5 py-1 rounded-lg bg-sky-500/10 text-sky-500 tracking-wide">
                      {userEmail}
                    </span>
                  </div>
                  <div className={`flex justify-between items-center py-4 px-2 border-b duration-100
                    ${theme === 'light' ? 'border-slate-100' : 'border-white/5'
                  }`}>
                    <span className="text-sm opacity-60">Статус</span>
                    <span className="text-xs md:text-sm font-bold px-2.5 py-1 rounded-lg bg-sky-500/10 text-sky-500 uppercase tracking-wide">
                      {userData.role}
                    </span>
                  </div>
                </div>
              </section>

              {/* Настройки интерфейса */}
              <section>
                <h2 className="text-[10px] md:text-[11px] uppercase tracking-[0.2em] opacity-40 font-bold mb-4 px-2">{t.settings}</h2>
                <div className={`rounded-[2rem] overflow-hidden shadow-sm transition-colors 
                  ${theme === 'light' ? 'bg-slate-50' : 'bg-white/5'
                }`}>
                  
                  {/* Переключатель темы */}
                  <button 
                    onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
                    className={`w-full flex items-center justify-between p-5 md:p-6 transition-colors ${
                      theme === 'light' ? 'hover:bg-black/3' : 'hover:bg-white/3'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      {theme === 'light' ? <Sun size={20} className="text-amber-500" /> : <Moon size={20} className="text-sky-400" />}
                      <span className="text-sm md:text-base font-semibold">{t.appearance}</span>
                    </div>
                    <div className={`w-11 h-6 rounded-full relative transition-colors ${
                      theme === 'light' ? 'bg-slate-300' : 'bg-sky-600'
                    }`}>
                      <div className={`absolute top-1 w-4 h-4 rounded-full bg-white shadow-sm transition-all ${
                        theme === 'light' ? 'left-1' : 'left-6'
                      }`} />
                    </div>
                  </button>

                  {/* Выбор языка */}
                  <div className={`p-5 md:p-6 border-t duration-100 ${
                    theme === 'light' ? 'border-slate-200' : 'border-white/5'
                  }`}>
                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-sm md:text-base font-semibold">{t.language}</span>
                    </div>
                    <div className={`flex p-1.5 rounded-2xl gap-1 duration-100 ${
                      theme === 'light' ? 'bg-white/50 border border-slate-200/50 ' : 'bg-black/20 border border-white/10'
                    }`}>
                      {['ru', 'kz', 'en'].map((lang) => (
                        <button
                          key={lang}
                          onClick={() => setLanguage(lang as any)}
                          className={`flex-1 py-2.5 rounded-xl text-xs font-bold uppercase transition-all ${
                            language === lang 
                              ? (theme === 'light' ? 'bg-white text-sky-600 shadow-sm' : 'bg-white/10 text-white shadow-md') 
                              : 'opacity-40 hover:opacity-100'
                          }`}
                        >
                          {lang}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </section>

              {/* Кнопка выхода */}
              <div className="pt-4">
                <button           
                  onClick={() => logout()}
                  className={`w-full py-5 rounded-2xl flex items-center justify-center gap-2 text-red-500 font-bold text-sm transition-all border border-transparent ${
                    theme === 'light' ? 'hover:bg-red-50' : 'hover:bg-red-500/5 hover:border-red-500/10'
                  }`}
                >
                  <LogOut size={18} />
                  {t.logout}
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </main>
  );
}