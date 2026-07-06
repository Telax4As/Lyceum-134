import { Clock, ChevronRight, Calendar } from 'lucide-react';

interface Lesson {
  id: number;
  time: string;
  room: string;
  title: Record<string, string>;
}

interface LessonsListProps {
  lessons: Lesson[];
  language: string;
  theme: string;
  roomShortText: string;
  noLessonsText: string;
  onLessonClick?: (id: number) => void;
}

export function LessonsList({
  lessons,
  language,
  theme,
  roomShortText,
  noLessonsText,
  onLessonClick,
}: LessonsListProps) {
  if (lessons.length === 0) {
    return (
      <div className="p-16 text-center opacity-40 flex flex-col items-center gap-3">
        <Calendar size={32} strokeWidth={1.5} />
        <p className="text-xs font-bold uppercase tracking-wider">{noLessonsText}</p>
      </div>
    );
  }

  return (
    <div className="divide-y divide-slate-200/60 dark:divide-white/5">
      {lessons.map((lesson, index) => (
        <button
          key={lesson.id}
          onClick={() => onLessonClick?.(lesson.id)}
          className={`w-full flex items-center justify-between p-5 md:p-6 text-left transition-colors group ${
            theme === 'light' ? 'hover:bg-black/[0.02]' : 'hover:bg-white/[0.02]'
          }`}
        >
          <div className="flex items-center gap-5 md:gap-6">
            {/* Порядковый номер урока */}
            <div className={`flex items-center justify-center w-10 h-10 rounded-xl font-black text-sm border duration-100 ${
              theme === 'light' 
                ? 'bg-white border-slate-200 text-slate-600 group-hover:border-slate-300' 
                : 'bg-black/20 border-white/5 text-slate-300 group-hover:bg-black/40'
            }`}>
              {index + 1}
            </div>

            {/* Мета-информация и Название */}
            <div className="space-y-0.5">
              <div className="flex items-center gap-2.5 opacity-50 text-[10px] font-black tracking-wider uppercase">
                <span className="flex items-center gap-1">
                  <Clock size={11} />
                  {lesson.time}
                </span>
                <span>•</span>
                <span>
                  {lesson.room} {roomShortText}
                </span>
              </div>
              <h3 className="text-sm md:text-base font-semibold tracking-tight transition-colors group-hover:text-sky-500">
                {lesson.title[language] || lesson.title['ru']}
              </h3>
            </div>
          </div>

          {/* Индикатор перехода */}
          <div className="text-sky-500 opacity-40 group-hover:opacity-100 transition-all duration-100 transform group-hover:translate-x-1">
            <ChevronRight size={18} strokeWidth={2.5} />
          </div>
        </button>
      ))}
    </div>
  );
}