import { format, parseISO } from "date-fns";
import { useState } from "react";
import { useUser } from "@/stores/userStore";
import AddWorkExperience from "./AddWorkExperience";
import { Button } from "./ui/button";
import { Popover, PopoverTrigger, PopoverContent } from "./ui/popover";
import { Calendar } from "./ui/calendar";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Checkbox } from "./ui/checkbox";

function ExperienceComponent({ experience }: any) {
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const { updateWorkExperience, deleteWorkExperience, fetchUser } = useUser();
  const [updatedExperience, setUpdatedExperience] = useState({
    employer: experience?.employer || "",
    role: experience?.role || "",
    fromDate: experience?.fromDate ? parseISO(experience.fromDate) : new Date(),
    toDate:
      experience?.toDate && experience.toDate !== "Present"
        ? parseISO(experience.toDate)
        : null,
  });

  const [isPresent, setIsPresent] = useState(experience?.toDate === "Present");

  const handleSave = async () => {
    const formattedExperience = {
      employer: updatedExperience.employer,
      role: updatedExperience.role,
      fromDate: format(updatedExperience.fromDate, "yyyy-MM-dd"),
      toDate: isPresent
        ? "Present"
        : format(updatedExperience.toDate!, "yyyy-MM-dd"),
    };
    setIsLoading(true);
    await updateWorkExperience(formattedExperience, experience?.id);
    fetchUser();
    setIsLoading(false);
  };

  const handleDelete = async () => {
    setIsDeleting(true);
    await deleteWorkExperience(experience?.id);
    fetchUser();
    setIsDeleting(false);
  };

  return (
    <div className="border rounded-lg p-4 flex justify-between my-2">
      <div className="flex items-center justify-between w-full">
        <div>
          <p className="text-gray-400">{updatedExperience.employer}</p>
          <h2 className="text-lg font-semibold text-white">
            {updatedExperience.role}
          </h2>
          <p className="text-sm text-gray-500 mt-2">
            {format(updatedExperience.fromDate, "MMMM yyyy")} -{" "}
            {isPresent
              ? "Present"
              : format(updatedExperience.toDate!, "MMMM yyyy")}
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant={"destructive"} onClick={handleDelete}>
            {isDeleting ? (
              <span className="flex justify-center items-center">
                <span className="animate-spin h-5 w-5 border-t-2 border-gray-500 border-solid rounded-full" />
                <span className="ml-2">Deleting...</span>
              </span>
            ) : (
              "Delete"
            )}
          </Button>

          <Popover>
            <PopoverTrigger asChild>
              <Button>Update</Button>
            </PopoverTrigger>
            <PopoverContent className="w-80">
              <div className="space-y-2">
                <Label>Employer</Label>
                <Input
                  value={updatedExperience.employer}
                  onChange={(e) =>
                    setUpdatedExperience({
                      ...updatedExperience,
                      employer: e.target.value,
                    })
                  }
                />
                <Label>Role</Label>
                <Input
                  value={updatedExperience.role}
                  onChange={(e) =>
                    setUpdatedExperience({
                      ...updatedExperience,
                      role: e.target.value,
                    })
                  }
                />
                <div className="flex flex-col gap-2">
                  <Label>From Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline">
                        {format(updatedExperience.fromDate, "MMMM yyyy")}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto">
                      <Calendar
                        mode="single"
                        selected={updatedExperience.fromDate}
                        onSelect={(date) =>
                          setUpdatedExperience({
                            ...updatedExperience,
                            fromDate: date!,
                          })
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                <div className="flex flex-col gap-2">
                  <Label>To Date</Label>
                  <div className="flex items-center gap-2">
                    <Checkbox
                      checked={isPresent}
                      onCheckedChange={(checked: any) => {
                        setIsPresent(checked);
                        setUpdatedExperience({
                          ...updatedExperience,
                          toDate: checked ? null : new Date(),
                        });
                      }}
                    />
                    <span>Currently working here</span>
                  </div>

                  {!isPresent && (
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline">
                          {updatedExperience.toDate
                            ? format(updatedExperience.toDate, "MMMM yyyy")
                            : "Select Date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto">
                        <Calendar
                          mode="single"
                          selected={updatedExperience.toDate!}
                          onSelect={(date) =>
                            setUpdatedExperience({
                              ...updatedExperience,
                              toDate: date!,
                            })
                          }
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  )}
                </div>
                <Button className="w-full mt-2" onClick={handleSave}>
                  {isLoading ? (
                    <span className="flex justify-center items-center">
                      <span className="animate-spin h-5 w-5 border-t-2 border-gray-500 border-solid rounded-full" />
                      <span className="ml-2">Saving...</span>
                    </span>
                  ) : (
                    "Save Changes"
                  )}
                </Button>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </div>
  );
}

function ExperienceSettings() {
  const { user } = useUser();

  return (
    <div className="px-10 py-10">
      <div className="flex justify-between">
        <h1 className="text-xl font-semibold">Work Experience</h1>
        <AddWorkExperience />
      </div>

      <div className="mt-10">
        {user?.workExperience?.map((experience, index) => (
          <div key={index}>
            <ExperienceComponent experience={experience} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default ExperienceSettings;
