import { useState, useEffect } from "react";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { roles, skills as allSkills } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { useUser } from "@/stores/userStore";

function SkillsSettings() {
  const { user, skillsUpdate } = useUser();
  const [selectedRoles, setSelectedRoles] = useState<string[]>(user?.roles || []);
  const [selectedSkills, setSelectedSkills] = useState<string[]>(user?.skills || []);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (user) {
      setSelectedRoles(user.roles || []);
      setSelectedSkills(user.skills || []);
    }
  }, [user]);

  const handleCheckboxChange = (item: string, setState: Function): void => {
    setState((prevState: string[]) =>
      prevState.includes(item)
        ? prevState.filter((i: string) => i !== item)
        : [...prevState, item]
    );
  };

  const addSkill = (skill: string) => {
    setSelectedSkills((prev) => [...prev, skill]);
  };

  const removeSkill = (skill: string) => {
    setSelectedSkills((prev) => prev.filter((s) => s !== skill));
  };

  const suggestedSkills = allSkills.filter(
    (skill) => !selectedSkills.includes(skill)
  );

  const handleUpdateSkills = async () => {
    setIsLoading(true);
    await skillsUpdate({ selectedRoles, selectedSkills });

    setIsLoading(false);
  };

  return (
    <div className="px-10 py-10">
      <div className="flex w-full justify-between">
        <div className="w-1/2">
          <Label className="text-xl">Which of the following describes you best?</Label>
          {roles.map((role, index) => (
            <div
              key={index}
              className={`flex items-center space-x-2 border max-w-md p-4 my-3 ${
                selectedRoles.includes(role) ? "bg-secondary" : ""
              }`}
            >
              <Checkbox
                id={role.toLowerCase().replace(/\s+/g, "-")}
                checked={selectedRoles.includes(role)}
                onCheckedChange={() => handleCheckboxChange(role, setSelectedRoles)}
              />
              <label
                htmlFor={role.toLowerCase().replace(/\s+/g, "-")}
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {role}
              </label>
            </div>
          ))}
        </div>

        {/* Skills Selection */}
        <div className="w-1/2">
          <div className="mb-4">
            <Label className="text-xl">Selected Skills</Label>
            {selectedSkills.length > 0 ? (
              <div className="flex flex-wrap gap-2 mt-2">
                {selectedSkills.map((skill) => (
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
          <div>
            <Label>Suggested Skills</Label>
            {suggestedSkills.length > 0 ? (
              <div className="flex flex-wrap gap-2 mt-2">
                {suggestedSkills.map((skill) => (
                  <Button
                    key={skill}
                    variant="secondary"
                    size="sm"
                    onClick={() => addSkill(skill)}
                  >
                    + {skill}
                  </Button>
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-500 mt-2">No more suggestions</p>
            )}
          </div>
        </div>
      </div>
      <Button
        className={`w-36 mt-4 ${isLoading ? "disabled" : ""}`}
        onClick={handleUpdateSkills}
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
  );
}

export default SkillsSettings;
