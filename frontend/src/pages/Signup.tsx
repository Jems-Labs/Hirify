import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff } from "lucide-react";
import { useUser } from "@/stores/userStore";

function Signup() {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [passwordVisible, setPasswordVisible] = useState(false);
  const { signup } = useUser();
  async function handleUserSignup(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);
    await signup(formData);
    setIsLoading(false);
  }

  return (
    <div className="flex justify-center items-center min-h-screen">
      <form
        className="px-10 py-10 border rounded-lg w-[500px]"
        onSubmit={handleUserSignup}
      >
        <h1 className="text-3xl font-bold mb-2 text-center">Create Account</h1>
        <p className="text-sm text-gray-400 text-center">
          Enter your details below to create your account
        </p>
        <div className="grid w-full items-center gap-1.5 py-5">
          <Label htmlFor="name">Name</Label>
          <Input
            type="text"
            id="name"
            placeholder="Name"
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
        </div>
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
            "Signup"
          )}
        </Button>
      </form>
    </div>
  );
}

export default Signup;
