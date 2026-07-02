import { useQuery } from '@tanstack/react-query';
import { supabase } from '../../../api/supabase'; 

export interface Lesson {
  id: string;
  room: string;
  lessonNum: number;
  class_id: string;
  subjects: {
    name: string;
  } | null;
  users: {
    name: string; 
  } | null;
}

const fetchTodaySchedule = async (classId: string): Promise<Lesson[]> => {
  
  const { data, error } = await supabase
    .from('schedules')
    .select(`
      id,
      room,
      lessonNum,
      class_id,
      subjects ( name ),
      users ( name )
    `) 
    .eq('class_id', classId)
    .order('lessonNum', { ascending: true });

  if (error) {
    throw new Error(error.message);
  }

  
  return (data as unknown as Lesson[]) || [];
};

export const useTodaySchedule = (classId: string) => {
  return useQuery({
    queryKey: ['schedule', 'today', classId],
    queryFn: () => fetchTodaySchedule(classId),
    enabled: Boolean(classId),
    staleTime: 1000 * 60 * 5,
  });
};