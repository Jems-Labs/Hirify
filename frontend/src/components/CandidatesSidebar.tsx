import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { X } from "lucide-react";
import { skills as allSkills, roles as allRoles } from "@/lib/constants";

interface CandidatesSidebarProps {
  setSkills: React.Dispatch<React.SetStateAction<string[]>>;
  setRoles: React.Dispatch<React.SetStateAction<string[]>>;
  roles: string[];
  skills: string[];
}

function CandidatesSidebar({ setSkills, setRoles, roles, skills }: CandidatesSidebarProps) {
  const addSkill = (skill: string) => {
    setSkills((prev) => [...prev, skill]);
  };

  const removeSkill = (skill: string) => {
    setSkills((prev) => prev.filter((s) => s !== skill));
  };

  const addRole = (role: string) => {
    setRoles((prev) => [...prev, role]);
  };

  const removeRole = (role: string) => { 
    setRoles((prev) => prev.filter((r) => r !== role));
  };

  const suggestedSkills = allSkills.filter((skill) => !skills.includes(skill));
  const suggestedRoles = allRoles.filter((role) => !roles.includes(role));

  return (
    <div className="w-[280px] border-r pb-10">


      <div className="px-5 py-5">
        <Label className="text-lg">Roles</Label>
        {roles.length > 0 ? (
          <div className="flex flex-wrap gap-2 mt-2">
            {roles.map((role) => (
              <Button
                key={role}
                variant="outline"
                size="sm"
                className="flex items-center space-x-1"
                onClick={() => removeRole(role)}
              >
                <span>{role}</span>
                <X className="h-4 w-4" />
              </Button>
            ))}
          </div>
        ) : (
          <p className="text-sm text-gray-400 mt-2">No roles selected</p>
        )}

        <div className="px-5">
          <Label>Suggested Roles</Label>
          {suggestedRoles.length > 0 ? (
            <div className="flex flex-wrap gap-2 mt-2">
              {suggestedRoles.map((role) => (
                <Button key={role} variant="secondary" size="sm" onClick={() => addRole(role)}>
                  + {role}
                </Button>
              ))}
            </div>
          ) : (
            <p className="text-sm text-gray-500 mt-2">No more suggestions</p>
          )}
        </div>
      </div>

      <div className="border-t px-5 py-5">
        <Label className="text-lg">Skills</Label>
        {skills.length > 0 ? (
          <div className="flex flex-wrap gap-2 mt-2">
            {skills.map((skill) => (
              <Button
                key={skill}
                variant="outline"
                size="sm"
                className="flex items-center space-x-1"
                onClick={() => removeSkill(skill)}  
              >
                <span>{skill}</span>
                <X className="h-4 w-4" />
              </Button>
            ))}
          </div>
        ) : (
          <p className="text-sm text-gray-400 mt-2">No skills selected</p>
        )}
      </div>

      <div className="px-5">
        <Label>Suggested Skills</Label>
        {suggestedSkills.length > 0 ? (
          <div className="flex flex-wrap gap-2 mt-2">
            {suggestedSkills.map((skill) => (
              <Button key={skill} variant="secondary" size="sm" onClick={() => addSkill(skill)}>
                + {skill}
              </Button>
            ))}
          </div>
        ) : (
          <p className="text-sm text-gray-500 mt-2">No more suggestions</p>
        )}
      </div>
    </div>
  );
}

export default CandidatesSidebar;
