import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

interface IUseAuthStore {
  isAuth: boolean
  setAuth: (value: boolean) => void
}

export const useAuthStore = create<IUseAuthStore>()(
  devtools((set) => ({
    isAuth: false,
    setAuth: (value) => set((state) => ({ isAuth: value })),
  }))
)
