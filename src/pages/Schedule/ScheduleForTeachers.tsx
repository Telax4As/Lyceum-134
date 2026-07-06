import { useAppStore } from '../../store/useAppStore';
import { useSchedule } from './hooks/useSchedule'; 
import { Error } from '../ErrorPage';
import { Calendar, Clock, BookOpen, MapPin } from 'lucide-react';

// Текст и локализация (без учителей)
const content = {
  ru: {
    title: 'Расписание занятий',
    loading: 'Загрузка расписания...',
    errTitle: 'Ошибка загрузки',
    noLessons: 'В этот день занятий нет',
    room: 'Каб.',
    days: [
      { id: 'Понедельник', label: 'Пн' },
      { id: 'Вторник', label: 'Вт' },
      { id: 'Среда', label: 'Ср' },
      { id: 'Четверг', label: 'Чт' },
      { id: 'Пятница', label: 'Пт' },
    ]
  },
  kz: {
    title: 'Сабақ кестесі',
    loading: 'Кесте жүктелуде...',
    errTitle: 'Жүктеу қатесі',
    noLessons: 'Бұл күнге сабақ жоқ',
    room: 'Каб.',
    days: [
      { id: 'Понедельник', label: 'Дс' },
      { id: 'Вторник', label: 'Сс' },
      { id: 'Среда', label: 'Ср' },
      { id: 'Четверг', label: 'Бс' },
      { id: 'Пятница', label: 'Жм' },
    ]
  },
  en: {
    title: 'Schedule',
    loading: 'Loading schedule...',
    errTitle: 'Loading error',
    noLessons: 'No lessons on this day',
    room: 'Room',
    days: [
      { id: 'Понедельник', label: 'Mon' },
      { id: 'Вторник', label: 'Tue' },
      { id: 'Среда', label: 'Wed' },
      { id: 'Четверг', label: 'Thu' },
      { id: 'Пятница', label: 'Fri' },
    ]
  }
};

const AVAILABLE_CLASSES = [
  { id: 1, name: '11А' },
  { id: 2, name: '11Б' },
  { id: 3, name: '11В' },
  { id: 4, name: '11Г' },
];

const lessTime: Record<number, string> = {
  1: '08:05 - 08:50',
  2: '08:55 - 09:40',
  3: '09:55 - 10:40',
  4: '10:45 - 11:30',
  5: '11:45 - 12:30',
  6: '12:35 - 13:20',
  7: '13:25 - 14:10',
  8: '14:25 - 15:10',
  9: '15:15 - 16:00',
}

export default function SchedulePage() {
  const { theme, language, currentDay, setDay, selectedClass, setSelectedClass } = useAppStore();
  const t = content[language];

  // Передаем ID класса и день недели в хук
  const { data: lessons, isLoading, error: scheduleError } = useSchedule(selectedClass, currentDay);

  if (scheduleError) {
    return <Error message={`${t.errTitle}: ${(scheduleError as any).message || 'Ошибка'}`} />;
  }

  return (
    <main className={`min-h-screen w-full pt-16 md:pt-24 pb-12 transition-colors duration-100 ${
      theme === 'light' ? 'bg-white text-slate-900' : 'bg-[#0b0f1a] text-slate-100'
    }`}>
      <div className="max-w-2xl mx-auto px-4 sm:px-6">
        
        {/* Заголовок */}
        <div className="mb-8 md:mb-10 text-center sm:text-left">
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight flex items-center justify-center sm:justify-start gap-3">
            <Calendar className={theme === 'light' ? 'text-sky-600' : 'text-sky-400'} size={28} />
            {t.title}
          </h1>
        </div>

        {/* Управление: Селект класса + Дни недели */}
        <div className="flex flex-col sm:flex-row items-center gap-4 mb-8">
          <div className="w-full sm:w-auto">
            <select
              value={selectedClass}
              onChange={(e) => setSelectedClass(Number(e.target.value))}
              className={`w-full sm:w-32 px-4 py-3 rounded-xl font-bold text-sm border transition-all appearance-none cursor-pointer outline-none ${
                theme === 'light' 
                  ? 'bg-slate-50 border-slate-200 text-slate-800 focus:border-sky-500' 
                  : 'bg-white/5 border-white/10 text-white focus:border-sky-500'
              }`}
            >
              {AVAILABLE_CLASSES.map((cls) => (
                <option key={cls.id} value={cls.id} className={theme === 'light' ? 'text-slate-950' : 'bg-[#0b0f1a] text-white'}>
                  {cls.name}
                </option>
              ))}
            </select>
          </div>

          {/* Кнопки дней */}
          <div className={`w-full flex p-1.5 rounded-2xl gap-1 duration-100 overflow-x-auto no-scrollbar ${
            theme === 'light' ? 'bg-slate-50 border border-slate-200/50' : 'bg-black/20 border border-white/10'
          }`}>
            {t.days.map((day) => (
              <button
                key={day.id}
                onClick={() => setDay(day.id)}
                className={`flex-1 min-w-[45px] py-2.5 rounded-xl text-xs font-bold uppercase transition-all ${
                  currentDay === day.id 
                    ? (theme === 'light' ? 'bg-white text-sky-600 shadow-sm' : 'bg-white/10 text-white shadow-md') 
                    : 'opacity-40 hover:opacity-100'
                }`}
              >
                {day.label}
              </button>
            ))}
          </div>
        </div>

        {/* Список уроков */}
        <div className="space-y-4">
          {isLoading ? (
            <div className="text-center py-12 opacity-50 font-medium text-sm">
              {t.loading}
            </div>
          ) : lessons && lessons.length > 0 ? (
            lessons.map((lesson: any, index: number) => (
              <div 
                key={lesson.id || index}
                className={`p-5 rounded-2xl border transition-all duration-100 flex items-center justify-between gap-4 ${
                  theme === 'light' 
                    ? 'bg-slate-50/50 border-slate-100 hover:bg-slate-50' 
                    : 'bg-white/[0.02] border-white/5 hover:bg-white/[0.04]'
                }`}
              >
                {/* 1-я колонка: Номер и время урока */}
                <div className={`flex flex-col items-center justify-center p-2.5 rounded-xl min-w-[68px] ${
                  theme === 'light' ? 'bg-sky-50 text-sky-600' : 'bg-sky-500/10 text-sky-400'
                }`}>
                  <span className="text-[10px] font-bold uppercase tracking-wider opacity-60 mb-0.5">
                    {lesson.lessonNum} урок
                  </span>
                  <div className="flex items-center gap-1 text-xs font-bold">
                    <Clock size={11} />
                    <span>{lessTime[lesson.lessonNum] || 'Время не указано'}</span>
                  </div>
                </div>

                {/* 2-я колонка: Название предмета */}
                <div className="flex-1 min-w-0">
                  <h3 className="text-base md:text-lg font-bold tracking-tight truncate flex items-center gap-2">
                    <BookOpen size={16} className="opacity-40 shrink-0" />
                    {/* Если у тебя связь с таблицей предметов осталась, пишем lesson.subjects?.name, если просто колонка — то lesson.subject_name */}
                    {lesson.subjects?.name || lesson.subject_name || 'Предмет'}
                  </h3>
                </div>

                {/* 3-я колонка: Кабинет (появляется только если заполнен) */}
                {lesson.room && (
                  <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs md:text-sm font-semibold border ${
                    theme === 'light' 
                      ? 'bg-white border-slate-200/60 text-slate-600' 
                      : 'bg-white/[0.02] border-white/5 text-slate-300'
                  }`}>
                    <MapPin size={14} className="opacity-50 text-sky-500" />
                    <span>{t.room} {lesson.room}</span>
                  </div>
                )}

              </div>
            ))
          ) : (
            <div className={`text-center py-16 rounded-3xl border border-dashed text-sm opacity-40 font-medium ${
              theme === 'light' ? 'border-slate-200' : 'border-white/10'
            }`}>
              {t.noLessons}
            </div>
          )}
        </div>

      </div>
    </main>
  );
}