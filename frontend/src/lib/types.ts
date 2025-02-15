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
  bio: string;
  status: string;
  skills: string[];
  roles: string[];
  workExperience: workExperience[];
};
export type workExperience = {
  id: number;
  userId: number;
  user: User;
} & addWorkExperience;
export type addWorkExperience = {
  employer: string;
  role: string;
  fromDate: string;
  toDate: string | null;
  description: string;
};

export type ScheduleInterview = {
  title: string;
  description: string;
  roleOffered: string;
  candidateEmail: string;
  date: string;
};
export type userStore = {
  user: User | null;

  signup: (formData: Signup) => void;
  login: (formData: Login) => void;
  fetchUser: () => void;
  logout: () => void;
  profileUpdate: (data: any) => void;
  skillsUpdate: (data: any) => void;
  addWorkExperience: (data: addWorkExperience) => void;
  updateWorkExperience: (data: any, id: number) => void;
  deleteWorkExperience: (id: number) => void;
};
export type interviewStore = {
  scheduleInterview: (formData: ScheduleInterview) => Promise<any>;
};
