import { BACKEND_URL } from "@/lib/backendUrl";
import { interviewStore } from "@/lib/types";
import axios from "axios";
import { toast } from "sonner";
import { create } from "zustand";

export const useInterview = create<interviewStore>(() => ({
  scheduleInterview: async (formData) => {
    try {
      const res = await axios.post(
        `${BACKEND_URL}/api/interview/schedule`,
        formData,
        {
          withCredentials: true,
        }
      );
      if (res.status === 200) {
        toast.success("Interview Scheduled");
        return res.data;
      }
    } catch (error) {
      toast.error("Failed to schedule interview");

      return null;
    }
  },
}));
