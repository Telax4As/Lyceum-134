import { Link } from 'react-router-dom';

export function ProfileBtn({theme, profile}: {theme: string, profile: string}){

    return (
        <Link to="/profile" className={`
            flex items-center h-10 gap-2 px-4 py-2 rounded-xl text-sm font-bold transition-all active:scale-95 duration-100
            ${theme === 'light' 
                ? 'bg-slate-100 text-slate-700 hover:bg-slate-200' 
                : 'bg-slate-800 text-slate-100 hover:bg-slate-700'}
            `}>
            
            {/* Иконка пользователя (простой SVG) */}
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
            </svg>

            {/* Отображаем имя пользователя или просто слово "Профиль" */}
            <span>{profile}</span>
        </Link>
    );
};