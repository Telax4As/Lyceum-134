import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AppState {

  uid: string | null;
  setUid: (uid: string | null) => void;

  role: 'guest' | 'student' | 'teacher' | 'admin';
  setRole: (role: 'guest' | 'student' | 'teacher' | 'admin') => void;

  theme: 'light' | 'dark';
  setTheme: (theme: 'light' | 'dark') => void;

  language: 'ru' | 'kz' | 'en';
  setLanguage: (language: 'ru' | 'kz' | 'en') => void;

  email: string | undefined;
  setEmail: (email: string | undefined) => void;

  currentDay: string;
  setDay: (day: string) => void;

  selectedClass: number;
  setSelectedClass: (classId: number) => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      // Дефолтные значения
      uid: null,
      role: 'guest',
      theme: 'light',
      language: 'ru',
      email: undefined,
      currentDay: "Понедельник",
      selectedClass: 1,

      setUid: (uid) => set({ uid }),
      setRole: (role) => set({ role }),
      setEmail: (email) => set({ email }),
      setDay: (day) => set({ currentDay: day }),
      setSelectedClass: (classId) => set({ selectedClass: classId }),
      setTheme: (theme) => {set({ theme });},
      setLanguage: (language) => set({ language }),
    }),
    {
      name: 'app-storage', // Ключ в LocalStorage
    }
  )
);    