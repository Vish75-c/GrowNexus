import { create } from "zustand";
import { createAuthSlice } from "./auth-slice/auth-slice";
import { createChatSlice } from "./chat-slice/chat-slice";
import { createBlogSlice } from "./blog-slice/blog-slice";

export const useAppStore=create()((...a)=>({
    ...createAuthSlice(...a),
    ...createChatSlice(...a),
    ...createBlogSlice(...a),
}))