import { useQuery } from '@tanstack/react-query';
import { supabase } from '../../../api/supabase'; 

export interface Lesson {
  id: string;        // Добавили в select ниже
  room: string;
  lessonNum: number;
  class_id: number;  // Изменили на number, так как в Zustand у тебя id класса — число
  subjects: {
    name: string;
  } | null;
  users: {
    name: string; 
  } | null;
  time?: string;     // Опционально, если будешь добавлять время уроков
}

const fetchTodaySchedule = async (classId: number, day: string): Promise<Lesson[]> => {
  const { data, error } = await supabase
    .from('schedule')
    .select(`
      lessonNum,
      room,
      subjects ( name )
    `) 
    .eq('class_id', classId)
    .eq('dayOfWeek', day)
    .order('lessonNum', { ascending: true });

  if (error) {
    throw new Error(error.message);
  }

  // Честное приведение типов
  return (data as unknown as Lesson[]) || [];
};

export const useSchedule = (classId: number, day: string) => {
  return useQuery({
    queryKey: ['schedule',  classId, day],
    queryFn: () => fetchTodaySchedule(classId, day),
    // Если classId равен 0 или undefined, запрос не пойдет
    enabled: Boolean(classId), 
  });
};