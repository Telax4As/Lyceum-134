export function StatCard({ theme, Icon, value, label }: { theme: string; Icon: any; value: string; label: string }) {
    return (
        <div className={`p-6 md:p-8 rounded-[2rem] border transition-all duration-100
            ${theme === 'light' ? 'bg-white border-slate-100 shadow-sm' : 'bg-slate-900/40 border-slate-800'
            }`}>
              <Icon size={24} className="text-sky-500 mb-4" />
              <div className="text-2xl md:text-3xl font-black mb-1">{value}</div>
              <div className="text-[10px] font-bold uppercase tracking-widest opacity-40">{label}</div>
            </div>
    )
}