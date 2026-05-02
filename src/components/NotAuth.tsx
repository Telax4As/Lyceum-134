import { Link } from 'react-router-dom';
import { useAppStore } from '../store/useAppStore';

const NotAuth = () => {
    const { theme, language } = useAppStore();

    const content = {
        ru: {
            title: 'Доступ ограничен',
            description: 'Пожалуйста, авторизуйтесь в системе, чтобы просматривать эти данные.',
            button: 'Войти в аккаунт'
        },
        kz: {
            title: 'Қолжетімділік шектелген',
            description: 'Бұл деректерді көру үшін жүйеге кіруіңізді сұраймыз.',
            button: 'Аккаунтқа кіру'
        },
        en: {
            title: 'Access Denied',
            description: 'Please log in to the system to view these data.',
            button: 'Log In'
        }
    };

    const t = content[language];

    return (
        <div className={`
            min-h-[80vh] flex flex-col items-center justify-center px-4 text-center w-screen
            ${theme === 'light' ? 'bg-white text-slate-900' : 'bg-slate-950 text-slate-100'}
        `}>
            {/* Иконка замка */}
            <div className={`
                mb-6 p-6 rounded-full 
                ${theme === 'light' ? 'bg-sky-50 text-sky-500' : 'bg-sky-950/30 text-sky-400'}
            `}>
                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                </svg>
            </div>

            <h1 className="text-3xl font-bold mb-3">
                {t.title}
            </h1>
            
            <p className={`
                max-w-md mb-8 text-lg
                ${theme === 'light' ? 'text-slate-600' : 'text-slate-400'}
            `}>
                {t.description}
            </p>

            <Link 
                to="/login" 
                className={`
                    px-8 py-3 rounded-xl text-base font-bold transition-all active:scale-95 shadow-xl
                    ${theme === 'light' 
                        ? 'bg-sky-600 text-white hover:bg-sky-700 shadow-sky-200/50' 
                        : 'bg-slate-100 text-slate-900 hover:bg-slate-200'}
                `}
            >
                {t.button}
            </Link>
        </div>
    );
};

export default NotAuth;