  import { useQuery } from '@tanstack/react-query';
  import { supabase } from '../../../api/supabase'; 
  import { useAppStore } from '../../../store/useAppStore';

  export interface Profile {
    full_name: string;
    class: { name: string | null } | null;
    role: string;
  }

  async function fetchProfile(uid: string | null): Promise<Profile> {
    if (!uid) throw new Error("UID не найден");

    const { data, error } = await supabase
      .from('users')
      .select(`
          full_name,
          role
      `) 
      .eq('id', uid)
      .single();
    
    console.log(data, error); 

    if (error) {
      throw new Error(error.message);
    }

    // Приводим data к типу Profile, так как single() возвращает один объект
    return data as unknown as Profile; 
  };

  export const useProfile = () => {
    const { uid } = useAppStore();

    const { data, isLoading, error } = useQuery({
      queryKey: ['profile', uid],
      queryFn: () => fetchProfile(uid),
      enabled: Boolean(uid),
    });
    return { data, isLoading, error };
  };