import { AlertTriangle, Home } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAppStore } from '../store/useAppStore';

interface ErrorPageProps {
  message?: string;
}

export function Error({ message }: ErrorPageProps) {
  const { theme, language } = useAppStore();
  const navigate = useNavigate();

  const content = {
    ru: { title: "Произошла ошибка", button: "На главную", defaultMsg: "Что-то пошло не так. Пожалуйста, попробуйте позже." },
    kz: { title: "Қате орын алды", button: "Басты бетке", defaultMsg: "Бірнеше қате кетті. Кейінірек қайталап көріңіз." },
    en: { title: "An error occurred", button: "Go Home", defaultMsg: "Something went wrong. Please try again later." }
  };

  const t = content[language];

  return (
    <main className={`min-h-screen w-full flex items-center justify-center px-4 transition-colors duration-100 ${
      theme === 'light' ? 'bg-white text-slate-900' : 'bg-[#0b0f1a] text-slate-100'
    }`}>
      <div className="max-w-md w-full text-center space-y-6">
        
        {/* Иконка с подложкой */}
        <div className="flex justify-center">
          <div className={`p-5 rounded-full border animate-pulse ${
            theme === 'light' 
              ? 'bg-red-50 border-red-100 text-red-500' 
              : 'bg-red-500/10 border-red-500/20 text-red-400'
          }`}>
            <AlertTriangle size={48} />
          </div>
        </div>

        {/* Текстовый блок */}
        <div className="space-y-2">
          <h1 className="text-xl md:text-2xl font-bold tracking-tight">
            {t.title}
          </h1>
          <p className="text-sm opacity-60 max-w-sm mx-auto leading-relaxed break-words">
            {message || t.defaultMsg}
          </p>
        </div>

        {/* Кнопка возврата */}
        <div className="pt-2">
          <button
            onClick={() => navigate('/')}
            className={`mx-auto px-6 py-3 rounded-xl flex items-center justify-center gap-2 font-bold text-sm transition-all shadow-sm ${
              theme === 'light'
                ? 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                : 'bg-white/5 hover:bg-white/10 text-white border border-white/5'
            }`}
          >
            <Home size={16} />
            {t.button}
          </button>
        </div>

      </div>
    </main>
  );
}