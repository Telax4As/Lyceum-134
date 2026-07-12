export const content = {
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

export const AVAILABLE_CLASSES = [
  { id: 1, name: '11А' },
  { id: 2, name: '11Б' },
  { id: 3, name: '11В' },
  { id: 4, name: '11Г' },
];

export const lessTime: Record<number, string> = {
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