import { useUser } from "@/stores/userStore";
import { Checkbox } from "./ui/checkbox";
import { useState } from "react";
import { Calendar } from "./ui/calendar";
import { CalendarIcon, Plus } from "lucide-react";
import { Button } from "./ui/button";
import { format } from "date-fns";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "./ui/textarea";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";

function AddWorkExperience() {

  const [isLoading, setIsloading] = useState(false);
  const {  addWorkExperience, fetchUser } = useUser();
  const [isCurrentlyWorking, setIsCurrentlyWorking] = useState(false);

  const [experienceData, setExperienceData] = useState({
    employer: "",
    role: "",
    fromDate: "",
    toDate: "",
    description: "",
  });

  const handleChange = (field: string, value: string) => {
    setExperienceData((prev) => ({ ...prev, [field]: value }));
  };
  const handleDateChange = (field: string, date: Date | undefined) => {
    if (date) {
      handleChange(field, format(date, "yyyy-MM-dd"));
    }
  };

  const handleCheckboxToggle = () => {
    setIsCurrentlyWorking((prev) => !prev);
    setExperienceData((prev) => ({
      ...prev,
      toDate: !isCurrentlyWorking ? "Present" : "",
    }));
  };
 
  const handleAddExperience = async () => {
    setIsloading(true);
    await addWorkExperience(experienceData);
    fetchUser()
    setIsloading(false);
  };
  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Button>
            <Plus /> Add work experience
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add Work Experience</DialogTitle>
            <DialogDescription>
              Fill in the details of your work experience below and save your
              changes.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="flex gap-2">
              <div>
                <Label htmlFor="employer">Employer</Label>
                <Input
                  id="employer"
                  placeholder="Enter company name"
                  value={experienceData.employer}
                  onChange={(e) => handleChange("employer", e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="role">Role</Label>
                <Input
                  id="role"
                  placeholder="Enter your job title"
                  value={experienceData.role}
                  onChange={(e) => handleChange("role", e.target.value)}
                />
              </div>
            </div>

            <div className="flex gap-2">
              <div>
                <Label htmlFor="from-date">From</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="flex gap-2 w-full justify-start"
                    >
                      <CalendarIcon />
                      {experienceData.fromDate ? (
                        format(new Date(experienceData.fromDate), "PPP")
                      ) : (
                        <span>Select start date</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={
                        experienceData.fromDate
                          ? new Date(experienceData.fromDate)
                          : undefined
                      }
                      onSelect={(date) => handleDateChange("fromDate", date)}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
              <div>
                <Label htmlFor="to-date">To</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={`flex gap-2 w-full justify-start ${
                        isCurrentlyWorking
                          ? "opacity-50 cursor-not-allowed"
                          : ""
                      }`}
                      disabled={isCurrentlyWorking}
                    >
                      <CalendarIcon />
                      {experienceData.toDate ? (
                        experienceData.toDate === "Present" ? (
                          "Present"
                        ) : (
                          format(new Date(experienceData.toDate), "PPP")
                        )
                      ) : (
                        <span>Select end date</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  {!isCurrentlyWorking && (
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={
                          experienceData.toDate &&
                          experienceData.toDate !== "Present"
                            ? new Date(experienceData.toDate)
                            : undefined
                        }
                        onSelect={(date) => handleDateChange("toDate", date)}
                        initialFocus
                      />
                    </PopoverContent>
                  )}
                </Popover>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Checkbox
                id="current-job"
                checked={isCurrentlyWorking}
                onCheckedChange={handleCheckboxToggle}
              />
              <Label htmlFor="current-job">I am currently working here</Label>
            </div>

            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Briefly describe your responsibilities and achievements"
                value={experienceData.description}
                onChange={(e) => handleChange("description", e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              className={`w-36 mt-4 ${isLoading ? "disabled" : ""}`}
              onClick={handleAddExperience}
            >
              {isLoading ? (
                <span className="flex justify-center items-center">
                  <span className="animate-spin h-5 w-5 border-t-2 border-gray-500 border-solid rounded-full" />
                  <span className="ml-2">Loading...</span>
                </span>
              ) : (
                "Add"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default AddWorkExperience;
