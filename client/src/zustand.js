import { create } from "zustand";   
import { persist} from 'zustand/middleware'

export const useUserStore = create(
    persist((set) => ({
        user: null,
        setUser: (data) => set({ user: data })
    }),
        {
            name: "keep-user-data-"
        }
    ))
