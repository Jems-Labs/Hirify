import { Link } from "react-router-dom";
import Logo from "./Logo";
import { useState } from "react";
import { Button } from "./ui/button";
import { useUser } from "@/stores/userStore";
import {
  ChevronsUpDown,
  User,
  LogOut,
  Briefcase,
  Sparkles,
} from "lucide-react";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Command, CommandList, CommandItem } from "@/components/ui/command";

function Navbar() {
  const { user, logout } = useUser();
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b">
      <div className="container mx-auto flex items-center justify-between">
        <Link to={"/"}>
          <Logo />
        </Link>
        <div className="flex gap-3">
          {user ? (
            <div className="flex gap-3">
              <Button>
                <Briefcase className="h-5 w-5" />
                Start Hiring
              </Button>
              <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-[200px] justify-between"
                  >
                    <p>{user?.email}</p>
                    <ChevronsUpDown className="opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-0">
                  <Command>
                    <CommandList>
                      <Link to="/profile">
                        <CommandItem className="cursor-pointer p-3">
                          <User className="mr-2 h-4 w-4" /> Profile
                        </CommandItem>
                      </Link>

                      <CommandItem className="cursor-pointer p-3">
                        <Sparkles className="mr-2 h-4 w-4" /> Interviews
                      </CommandItem>
                      <span onClick={logout}>
                        <CommandItem className="cursor-pointer p-3 border-t">
                          <LogOut className="mr-2 h-4 w-4" /> Logout
                        </CommandItem>
                      </span>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
            </div>
          ) : (
            <>
              <Link to={"/login"}>
                <Button variant="outline">Login</Button>
              </Link>
              <Link to={"/signup"}>
                <Button>Signup</Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Navbar;
