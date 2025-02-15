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
  fetchUser: async () => {
    try {
      const res = await axios.get(`${BACKEND_URL}/api/user/fetch-user`, {
        withCredentials: true,
      });
      if (res.status === 200) {
        set({ user: res.data });
      }
    } catch (error) {
      set({ user: null });
    }
  },
  logout: async () => {
    try {
      const res = await axios.post(
        `${BACKEND_URL}/api/user/logout`,
        {},
        {
          withCredentials: true,
        }
      );
      if (res.status === 200) {
        set({ user: null });
        toast.success("Logout Successful");
      }
    } catch (error) {
      toast.error("Logout Failed");
    }
  },
  profileUpdate: async (data) => {
    try {
      const res = await axios.put(
        `${BACKEND_URL}/api/user/profile-update`,
        data,
        { withCredentials: true }
      );
      if (res.status === 200) {
        toast.success("Updated Profile");
      }
    } catch (error) {
      toast.error("Profile update failed");
    }
  },
  skillsUpdate: async (data) => {
    try {
      const res = await axios.put(
        `${BACKEND_URL}/api/user/skills-update`,
        data,
        { withCredentials: true }
      );
      if (res.status === 200) {
        toast.success("Updated Skills");
      }
    } catch (error) {
      toast.error("Skills update failed");
    }
  },
  addWorkExperience: async (data) => {
    try {
      const res = await axios.post(
        `${BACKEND_URL}/api/user/add-work-experience`,
        data,
        { withCredentials: true }
      );
      if (res.status === 200) {
        toast.success("Added experience");
      }
    } catch (error) {
      toast.error("Failed to add experience");
    }
  },
  updateWorkExperience: async (data, id) => {
    try {
      const res = await axios.put(
        `${BACKEND_URL}/api/user/update-work-experience/${id}`,
        data,
        { withCredentials: true }
      );
      if (res.status === 200) {
        toast.success("Updated work experience");
      }
    } catch (error) {
      toast.error("Failed to update work experience");
    }
  },
  deleteWorkExperience: async (id) => {
    try {
      const res = await axios.delete(
        `${BACKEND_URL}/api/user/delete-work-experience/${id}`,
        { withCredentials: true }
      );
      if (res.status === 200) {
        toast.success("Deleted work experience");
      }
    } catch (error) {
      toast.error("Failed to delete work experience");
    }
  },
}));
