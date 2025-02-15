import ExperienceSettings from "@/components/ExperienceSettings";
import ProfileSettings from "@/components/ProfileSettings";
import ProfileSidebar from "@/components/ProfileSidebar";
import SkillsSettings from "@/components/SkillsSettings";

import { useState } from "react";

function Profile() {
  const [profileMenu, setProfileMenu] = useState("profile");
  return (
    <div className="flex">
      <ProfileSidebar setProfileMenu={setProfileMenu} profileMenu={profileMenu}/>
      <div className="w-full">
        {profileMenu === "profile" && <ProfileSettings />}
        {profileMenu === "experience" && <ExperienceSettings />}
        {profileMenu === "skills" && <SkillsSettings />}
      </div>
    </div>
  );
}

export default Profile;
