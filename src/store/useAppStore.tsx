import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface AppState {
  role: 'guest' | 'student' | 'teacher' | 'admin';
  setRole: (role: 'guest' | 'student' | 'teacher' | 'admin') => void;

  theme: 'light' | 'dark';
  setTheme: (theme: 'light' | 'dark') => void;

  language: 'ru' | 'kz' | 'en';
  setLanguage: (language: 'ru' | 'kz' | 'en') => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      // Дефолтные значения
      role: 'guest',
      theme: 'light',
      language: 'ru',

      setRole: (role) => set({ role }),

      setTheme: (theme) => {
        // Мгновенное обновление DOM для Tailwind dark: классов
        const root = window.document.documentElement;
        if (theme === 'dark') {
          root.classList.add('dark');
        } else {
          root.classList.remove('dark');
        }
        set({ theme });
      },

      setLanguage: (language) => set({ language }),
    }),
    {
      name: 'app-storage', // Ключ в LocalStorage
      storage: createJSONStorage(() => localStorage),
      // Эта часть отвечает за то, чтобы при загрузке страницы тема применилась сразу
      onRehydrateStorage: () => (state) => {
        if (state?.theme === 'dark') {
          window.document.documentElement.classList.add('dark');
        } else {
          window.document.documentElement.classList.remove('dark');
        }
      },
    }
  )
);