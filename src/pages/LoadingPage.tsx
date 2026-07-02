import { RefreshCw } from 'lucide-react';
import { useAppStore } from '../store/useAppStore';

export function Loading() {
    const { theme, language } = useAppStore();

    const content = {
        ru: { loading: "Загрузка..." },
        kz: { loading: "Жүктелуде..." },
        en: { loading: "Loading..." }
    };

    const t = content[language]; 

    return ( 
        <div className={`min-h-screen w-full flex flex-col items-center justify-center py-20 gap-3 transition-colors duration-100 ${
            theme === 'light' ? 'bg-white text-slate-900' : 'bg-[#0b0f1a] text-slate-100'
        }`}>
            <RefreshCw size={24} className="animate-spin text-sky-500" />
            <p className="text-sm font-medium opacity-60">{t.loading}</p>
        </div>
    );
}