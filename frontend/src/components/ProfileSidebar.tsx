import { CommandItem, CommandList, Command } from "cmdk";
import { BookCheckIcon, BriefcaseBusiness, UserRound } from "lucide-react";

function ProfileSidebar({ setProfileMenu, profileMenu }: any) {
  return (
    <div className="w-[240px] border-r min-h-screen">
      <Command>
        <CommandList>
          <span onClick={() => setProfileMenu("profile")}>
            <CommandItem className={`cursor-pointer p-5 flex items-center gap-2 border-b ${profileMenu === "profile"? "bg-secondary": ""}`}>
              <UserRound size={16} />
              <p>Profile</p>
            </CommandItem>
          </span>
          <span onClick={() => setProfileMenu("skills")}>
          <CommandItem className={`cursor-pointer p-5 flex items-center gap-2 border-b ${profileMenu === "skills"? "bg-secondary": ""}`}>
              <BookCheckIcon size={16} />
              <p>Skills</p>
            </CommandItem>
          </span>
          <span onClick={() => setProfileMenu("experience")}>
          <CommandItem className={`cursor-pointer p-5 flex items-center gap-2 border-b ${profileMenu === "experience"? "bg-secondary": ""}`}>
              <BriefcaseBusiness size={16} />
              <p>Experience</p>
            </CommandItem>
          </span>
        </CommandList>
      </Command>
    </div>
  );
}

export default ProfileSidebar;
