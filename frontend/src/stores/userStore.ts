import { create } from "zustand";
import axios from "axios";
import { BACKEND_URL } from "@/lib/backendUrl";
import { userStore } from "@/lib/types";
import { toast } from "sonner";

export const useUser = create<userStore>((set) => ({
  user: null,

  signup: async (formData) => {
    try {
      const res = await axios.post(`${BACKEND_URL}/api/user/signup`, formData, {
        withCredentials: true,
      });
      if (res.status === 200) {
        toast("Signup Successful");
        set({ user: res.data });
      }
    } catch (error: any) {
      toast.error(error.response.data.msg);
      set({ user: null });
    }
  },
  login: async (formData) => {
    try {
      const res = await axios.post(`${BACKEND_URL}/api/user/login`, formData, {
        withCredentials: true,
      });
      if (res.status === 200) {
        toast.success("Login Successful");
        set({ user: res.data });
      }
    } catch (error: any) {
      toast.error(error.response.data.msg);
      set({ user: null });
    }
  },
}));
