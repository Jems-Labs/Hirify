import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { format } from "date-fns";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TIME_SLOTS } from "@/lib/constants";
import { ToUTCConversion } from "@/lib/utils";
import { Textarea } from "@/components/ui/textarea";
import { useInterview } from "@/stores/interviewStore";

function ScheduleInterview() {
  const [isLoading, setIsLoading] = useState(false)
  const [date, setDate] = useState<Date | undefined>();
  const [time, setTime] = useState<string | undefined>();
  const {scheduleInterview} = useInterview();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    roleOffered: "",
    candidateEmail: "",
    date: ""
  })
  useEffect(() => {
    if (date && time) {
      const utcDate = ToUTCConversion(date, time);
     setFormData({...formData, date: utcDate})
    }
  }, [date, time]);


  const handleScheduleInterview = async () => {
    setIsLoading(true);
    const newInterview = await scheduleInterview(formData);
    setIsLoading(false);
  }
  return (
    <div className="w-full flex justify-center items-center my-10">
      <Card className="w-[500px]">
        <CardHeader>
          <CardTitle className="text-center text-xl">
            Schedule An Interview
          </CardTitle>
        </CardHeader>

        <CardContent>
          <form className="grid grid-cols-1 gap-6">
            <div className="flex flex-col space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input id="title" placeholder="Enter interview title" onChange={(e)=>setFormData({...formData, title: e.target.value})}/>
            </div>
            <div className="flex flex-col space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea id="description" placeholder="Enter interview description" onChange={(e)=>setFormData({...formData, description: e.target.value})}/>
            </div>


            <div className="flex flex-col space-y-2">
              <Label htmlFor="role">Role Offered</Label>
              <Input id="role" placeholder="Enter role being offered" onChange={(e)=>setFormData({...formData, roleOffered: e.target.value})}/>
            </div>
            <div className="flex flex-col space-y-2">
              <Label htmlFor="candidate">Candidate</Label>
              <Input
                id="candidate"
                placeholder="Enter candidate email"
                type="email"
                onChange={(e)=>setFormData({...formData, candidateEmail: e.target.value})}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex flex-col space-y-2">
                <Label>Interview Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className="flex gap-2 w-full justify-start"
                    >
                      <CalendarIcon />
                      {date ? format(date, "PPP") : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div className="flex flex-col space-y-2">
                <Label className="text-sm font-medium">Interview Time</Label>
                <Select onValueChange={(value) => setTime(value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select time">
                      {time || "Select time"}
                    </SelectValue>
                  </SelectTrigger>
                  <SelectContent className="h-40">
                    {TIME_SLOTS.map((slot) => (
                      <SelectItem key={slot} value={slot}>
                        {slot}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </form>
        </CardContent>

        <CardFooter className="flex justify-between space-x-4">
          <Button variant="outline" className="w-full">
            Cancel
          </Button>
          <Button className={`w-full ${isLoading ? "disabled" : ""}`} onClick={handleScheduleInterview}>
          {isLoading ? (
            <span className="flex justify-center items-center">
              <span className="animate-spin h-5 w-5 border-t-2 border-gray-500 border-solid rounded-full" />
              <span className="ml-2">Loading...</span>
            </span>
          ) : (
            "Schedule"
          )}
        </Button>
        </CardFooter>
      </Card>
    </div>
  );
}

export default ScheduleInterview;
