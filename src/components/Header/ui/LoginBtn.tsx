import { Link } from 'react-router-dom';

export function LoginBtn({theme, login}: {theme: string, login: string}) {

    return (
        <Link to="/login" className={`
            px-5 py-2 rounded-xl text-sm font-bold transition-all active:scale-95 duration-100
            ${theme === 'light' 
              ? 'bg-sky-600 text-white hover:bg-sky-700 shadow-lg shadow-sky-200/50' 
              : 'bg-slate-100 text-slate-900 hover:bg-slate-200'}
            `}>
            {login}
        </Link>
    )
}