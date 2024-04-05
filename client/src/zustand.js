import { create } from "zustand";
import { persist } from 'zustand/middleware'

export const useUserStore = create(
    persist((set) => ({
        user: null,
        token: null,
        setUser: (data) => set({ user: data }),
        setToken: (data) => set({ token: data }),
    }),
        {
            name: "keep-user-data-"
        }
    ))
