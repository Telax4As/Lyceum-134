import { create } from 'zustand'

interface AppState {

  role: 'guest' | 'student' | 'teacher' | 'admin'
  setRole: (role: 'guest' | 'student' | 'teacher' | 'admin') => void

  theme: 'light' | 'dark'
  setTheme: (theme: 'light' | 'dark') => void
  
  language: 'ru' | 'kz' | 'en'
  setLanguage: (language: 'ru' | 'kz' | 'en') => void

}

export const useAppStore = create<AppState>((set) => ({
  role: 'guest',
  setRole: (role) => set({ role }),

  theme: 'light',
  setTheme: (theme) => set({ theme }),
    
  language: 'ru',
  setLanguage: (language) => set({ language }),
}))