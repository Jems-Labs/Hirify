import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff } from "lucide-react";
import { useUser } from "@/stores/userStore";

function Login() {
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [passwordVisible, setPasswordVisible] = useState(false);
  const { login } = useUser();
  async function handleUserLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);
    await login(formData);
    setIsLoading(false);
  }

  return (
    <div className="flex justify-center items-center min-h-screen">
      <form
        className="px-10 py-10 border rounded-lg w-[500px]"
        onSubmit={handleUserLogin}
      >
        <h1 className="text-3xl font-bold mb-2 text-center">Welcome Back</h1>
        <p className="text-sm text-gray-400 text-center mb-5">
          Glad to see you again! Login to your account below
        </p>

        <div className="grid w-full items-center gap-1.5">
          <Label htmlFor="email">Email</Label>
          <Input
            type="email"
            id="email"
            placeholder="Email"
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
          />
        </div>
        <div className="grid w-full items-center py-5 relative">
          <Label htmlFor="password" className="mb-2">
            Password
          </Label>
          <Input
            type={passwordVisible ? "text" : "password"}
            id="password"
            placeholder="Password"
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
          />
          <button
            type="button"
            onClick={() => setPasswordVisible(!passwordVisible)}
            className="absolute right-3 top-12"
          >
            {passwordVisible ? <EyeOff /> : <Eye />}
          </button>
        </div>
        <Button className={`w-full ${isLoading ? "disabled" : ""}`}>
          {isLoading ? (
            <span className="flex justify-center items-center">
              <span className="animate-spin h-5 w-5 border-t-2 border-gray-500 border-solid rounded-full" />
              <span className="ml-2">Loading...</span>
            </span>
          ) : (
            "Login"
          )}
        </Button>
      </form>
    </div>
  );
}

export default Login;
