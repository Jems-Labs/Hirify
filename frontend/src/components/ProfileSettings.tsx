import { Label } from "@/components/ui/label";
import { Input } from "./ui/input";
import { useUser } from "@/stores/userStore";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ChevronsUpDown } from "lucide-react";
import { CommandItem, CommandList, Command } from "@/components/ui/command";

function ProfileSettings() {
  const { user, profileUpdate, fetchUser } = useUser();
  const [isLoading, setIsLoading] = useState(false);
  const [profileDetails, setProfileDetails] = useState({
    name: user?.name || "",
    email: user?.email || "",
    bio: user?.bio || "",
    status: user?.status || "",
  });
  const [open, setOpen] = useState(false);

  const statusOptions: Record<string, string> = {
    openToWork: "Open To Work",
    hiring: "Hiring",
  };

  const handleProfileUpdate = async () => {
    setIsLoading(true);
    await profileUpdate(profileDetails);
    fetchUser()
    setIsLoading(false);
  };
  return (
    <div className="w-full max-w-2xl px-10 py-8">
      <div className="space-y-6">
        <div>
          <Label className="text-sm font-medium">Name</Label>
          <Input
            value={profileDetails?.name}
            className="mt-1 w-full"
            onChange={(e) =>
              setProfileDetails({ ...profileDetails, name: e.target.value })
            }
          />
        </div>

        <div>
          <Label className="text-sm font-medium">Email</Label>
          <Input
            value={profileDetails?.email}
            className="mt-1 w-full"
            onChange={(e) =>
              setProfileDetails({ ...profileDetails, email: e.target.value })
            }
            type="email"
          />
        </div>

        <div>
          <Label className="text-sm font-medium">Bio</Label>
          <Textarea
            placeholder="Tell about yourself"
            className="mt-1 w-full"
            value={profileDetails?.bio}
            onChange={(e) =>
              setProfileDetails({ ...profileDetails, bio: e.target.value })
            }
            rows={10}
          />
        </div>

        <div className="flex flex-col">
          <Label className="text-sm font-medium mb-2">Status</Label>
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={open}
                className="w-[200px] justify-between"
              >
                <p>
                  {statusOptions[profileDetails?.status] ||
                    "Select your status"}
                </p>
                <ChevronsUpDown className="opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
              <Command>
                <CommandList>
                  {Object.entries(statusOptions).map(([value, label]) => (
                    <CommandItem
                      key={value}
                      className="cursor-pointer p-3"
                      onSelect={() => {
                        setProfileDetails({ ...profileDetails, status: value });
                        setOpen(false);
                      }}
                    >
                      {label}
                    </CommandItem>
                  ))}
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        </div>
        <Button
          className={`w-36 mt-4 ${isLoading ? "disabled" : ""}`}
          onClick={handleProfileUpdate}
        >
          {isLoading ? (
            <span className="flex justify-center items-center">
              <span className="animate-spin h-5 w-5 border-t-2 border-gray-500 border-solid rounded-full" />
              <span className="ml-2">Loading...</span>
            </span>
          ) : (
            "Update"
          )}
        </Button>
      </div>
    </div>
  );
}

export default ProfileSettings;
