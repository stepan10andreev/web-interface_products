import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

interface ITokenStore {
  isAuth: boolean
  setAuth: (value: boolean) => void
}

export const useTokenStore = create<ITokenStore>()(
  devtools((set) => ({
    isAuth: false,
    setAuth: (value) => set((state) => ({ isAuth: value })),
  }))
)
