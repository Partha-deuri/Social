import { create } from "zustand";

const useUserStore = create((set)=>({
    userId:  "65d3923bbf1d9c79d112c88f",
    setUserId: (uid)=> set({userId:uid})
}))

export default useUserStore;