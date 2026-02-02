import { create } from "zustand";
import { createAuthSlice } from "./auth-slice/auth-slice";

export const useAppStore=create()((...a)=>({
    ...createAuthSlice(...a)
}))