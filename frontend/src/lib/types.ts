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
export type userStore = {
  user: User | null;

  signup: (formData: Signup) => void;
  login: (formData: Login) => void;
  fetchUser: () => void;
  logout: () => void;
};
