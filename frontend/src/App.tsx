import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import { Toaster } from "@/components/ui/sonner";
import { useUser } from "./stores/userStore";
import { useEffect } from "react";
import ScheduleInterview from "./pages/ScheduleInterview";
import Profile from "./pages/Profile";

function App() {
  const { fetchUser } = useUser();
  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />}/>
        <Route path="/schedule-interview" element={<ScheduleInterview />}/>
      </Routes>
      <Toaster position="top-center" />
    </div>
  );
}

export default App;
