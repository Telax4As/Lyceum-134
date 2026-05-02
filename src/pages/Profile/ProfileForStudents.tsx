import { useAppStore } from '../../store/useAppStore';
import { 
  User, 
  Settings, 
  LogOut, 
  ShieldCheck, 
  School, 
  Mail, 
  Moon, 
  Sun, 
  Languages 
} from 'lucide-react';

export default function ProfileForStudents() {
  const { theme, setTheme, language, setLanguage, role } = useAppStore();

  // В будущем эти данные будут приходить из API/Firebase
  const userData = {
    fullName: "Димаш",
    class: "11 «В»", // Твой класс в Лицее №134
    school: "Лицей №134",
    email: "dimash@example.com",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Dimash",
  };

  const t = {
    ru: {
      profile: "Профиль",
      settings: "Настройки",
      role: "Роль",
      class: "Класс",
      school: "Учебное заведение",
      appearance: "Оформление",
      langSelect: "Язык системы",
      logout: "Выйти из системы",
      themeName: theme === 'light' ? "Светлая" : "Темная"
    },
    kz: {
      profile: "Профиль",
      settings: "Баптаулар",
      role: "Рөлі",
      class: "Сынып",
      school: "Оқу орны",
      appearance: "Сыртқы түрі",
      langSelect: "Жүйе тілі",
      logout: "Жүйеден шығу",
      themeName: theme === 'light' ? "Жарық" : "Қараңғы"
    }
  }[language === 'en' ? 'ru' : language]; // Если выбран английский, пока оставим ru для примера

  return (
    <main className={`min-h-screen pt-24 pb-12 px-6 transition-colors duration-200 ${
      theme === 'light' ? 'bg-slate-50' : 'bg-[#0b0f1a] text-slate-200'
    }`}>
      <div className="max-w-4xl mx-auto space-y-6">
        
        {/* HEADER / AVATAR CARD */}
        <section className={`p-8 rounded-[2.5rem] border transition-all ${
          theme === 'light' ? 'bg-white border-slate-100 shadow-sm' : 'bg-slate-900/40 border-slate-800'
        }`}>
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="relative">
              <div className={`w-32 h-32 rounded-3xl overflow-hidden border-4 ${
                theme === 'light' ? 'border-sky-50' : 'border-blue-500/20'
              }`}>
                <img src={userData.avatar} alt="Avatar" className="w-full h-full object-cover" />
              </div>
              <div className="absolute -bottom-2 -right-2 bg-sky-600 text-white p-2 rounded-xl shadow-lg">
                <ShieldCheck size={20} />
              </div>
            </div>
            
            <div className="text-center md:text-left space-y-2">
              <h1 className="text-3xl font-black tracking-tight">{userData.fullName}</h1>
              <div className="flex flex-wrap justify-center md:justify-start gap-3">
                <span className="px-3 py-1 rounded-lg bg-sky-500/10 text-sky-500 text-xs font-bold uppercase tracking-wider">
                  {role}
                </span>
                <span className={`px-3 py-1 rounded-lg text-xs font-bold uppercase tracking-wider ${
                  theme === 'light' ? 'bg-slate-100 text-slate-600' : 'bg-slate-800 text-slate-400'
                }`}>
                  {userData.class}
                </span>
              </div>
            </div>
          </div>
        </section>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* INFO COLUMN */}
          <div className="md:col-span-2 space-y-6">
            <section className={`p-8 rounded-[2.5rem] border ${
              theme === 'light' ? 'bg-white border-slate-100 shadow-sm' : 'bg-slate-900/40 border-slate-800'
            }`}>
              <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                <User size={20} className="text-sky-500" />
                {t?.profile}
              </h2>
              
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-xl bg-slate-500/5"><School size={20} className="text-slate-400" /></div>
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-widest opacity-40">{t?.school}</p>
                    <p className="font-bold">{userData.school}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-xl bg-slate-500/5"><Mail size={20} className="text-slate-400" /></div>
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-widest opacity-40">Email</p>
                    <p className="font-bold">{userData.email}</p>
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* SETTINGS COLUMN */}
          <div className="space-y-6">
            <section className={`p-8 rounded-[2.5rem] border ${
              theme === 'light' ? 'bg-white border-slate-100 shadow-sm' : 'bg-slate-900/40 border-slate-800'
            }`}>
              <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                <Settings size={20} className="text-sky-500" />
                {t?.settings}
              </h2>

              <div className="space-y-6">
                {/* Theme Toggle */}
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest opacity-40 mb-3">{t?.appearance}</p>
                  <button 
                    onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
                    className={`w-full flex items-center justify-between p-3 rounded-2xl border transition-all ${
                      theme === 'light' ? 'bg-slate-50 border-slate-100' : 'bg-slate-800/50 border-slate-700'
                    }`}
                  >
                    <span className="text-sm font-bold">{t?.themeName}</span>
                    {theme === 'light' ? <Sun size={18} /> : <Moon size={18} />}
                  </button>
                </div>

                {/* Language Toggle */}
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest opacity-40 mb-3">{t?.langSelect}</p>
                  <div className="flex gap-2">
                    {['ru', 'kz', 'en'].map((lang) => (
                      <button
                        key={lang}
                        onClick={() => setLanguage(lang as any)}
                        className={`flex-1 py-2 rounded-xl text-xs font-bold uppercase transition-all ${
                          language === lang 
                            ? 'bg-sky-600 text-white' 
                            : theme === 'light' ? 'bg-slate-100 text-slate-400' : 'bg-slate-800 text-slate-600'
                        }`}
                      >
                        {lang}
                      </button>
                    ))}
                  </div>
                </div>

                <button className="w-full mt-4 py-4 flex items-center justify-center gap-2 text-red-500 font-bold text-sm hover:bg-red-500/5 rounded-2xl transition-colors">
                  <LogOut size={18} />
                  {t?.logout}
                </button>
              </div>
            </section>
          </div>

        </div>
      </div>
    </main>
  );
};
