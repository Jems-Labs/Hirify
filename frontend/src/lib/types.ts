export type Login = {
  email: string;
  password: string;
};
export type Signup = {
  name: string;
} & Login;
export type User = {
  id: number;
  name: string;
  email: string;
};
export type ScheduleInterview = {
  title: string;
  description: string;
  roleOffered: string;
  candidateEmail: string;
  date: string
}
export type userStore = {
  user: User | null;

  signup: (formData: Signup) => void;
  login: (formData: Login) => void;
  fetchUser: () => void;
  logout: () => void;
};
export type interviewStore = {
  scheduleInterview: (formData: ScheduleInterview) => Promise<any>;
  
};
