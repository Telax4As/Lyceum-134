import { Link } from 'react-router-dom';
import { useAppStore } from '../../store/useAppStore';

export const LoginBtn = () => {
    const { theme, language } = useAppStore();
    const content = {
        ru: { login: 'Вход' },
        kz: { login: 'Кіру' },
        en: { login: 'Login' },
    };
    const t = content[language];

    return (
        <Link to="/login" className={`
            px-5 py-2 rounded-xl text-sm font-bold transition-all active:scale-95
            ${theme === 'light' 
              ? 'bg-sky-600 text-white hover:bg-sky-700 shadow-lg shadow-sky-200/50' 
              : 'bg-slate-100 text-slate-900 hover:bg-slate-200'}
            `}>
            {t.login}
        </Link>
    )
}