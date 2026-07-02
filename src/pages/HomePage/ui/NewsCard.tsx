    import { ArrowRight } from 'lucide-react';

    export function NewsCard({ item, theme, language, tmore }: { item: any; theme: string; language: string; tmore: string }) {
        return (
            <article 
                className={`flex flex-col h-full group rounded-[2rem] md:rounded-[2.5rem] border overflow-hidden transition-all duration-100 ${
                    theme === 'light' 
                    ? 'bg-white border-slate-200 hover:shadow-xl' 
                    : 'bg-slate-900/40 border-slate-800 hover:bg-slate-900/60'
                }`}
                >
                <div className="relative h-48 md:h-56 overflow-hidden">
                    <img 
                    src={item.image} 
                    alt={item.title[language]} 
                    className="w-full h-full object-cover transition-transform duration-100 group-hover:scale-110"
                    />
                    <div className="absolute top-4 left-4">
                    <span className={`px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-wider ${
                        theme === 'light' ? 'text-slate-900 bg-white/90' : 'text-slate-300 bg-slate-900/90'
                    }`}>
                        {item.date}
                    </span>
                    </div>
                </div>

                <div className="flex flex-col flex-grow p-6 md:p-8">
                    <h3 className={`text-lg md:text-xl font-bold mb-3 line-clamp-2 leading-tight ${
                    theme === 'light' ? 'text-slate-900' : 'text-white'
                    }`}>
                    {item.title[language]}
                    </h3>
                    
                    <p className="text-sm opacity-50 mb-6 line-clamp-3 md:line-clamp-2">
                    {item.description[language]}
                    </p>
                    
                    <div className="mt-auto pt-4 border-t border-slate-100 dark:border-slate-800">
                    <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-sky-600">
                        {tmore} 
                        <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                    </div>
                    </div>
                </div>
            </article>
        )
    }