import { Badge } from "@/components/ui/badge";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";

function Candidate({ candidate }: any) {
  const navigate = useNavigate()
  return (
    <div className="border p-4 rounded-lg shadow-sm flex justify-between gap-3 w-[350px]">
      <div className="flex flex-col gap-2">
        <h1 className="text-lg font-bold">{candidate?.name}</h1>
        <p className="text-sm">{candidate?.email}</p>
        <p className="text-sm leading-relaxed">
          {candidate?.bio?.split(" ").slice(0, 20).join(" ") + "..."}
        </p>

        <div className="flex flex-wrap gap-2 mt-2">
          {candidate?.roles.map((role: string, index: number) => (
            <Badge key={index} variant="secondary">
              {role}
            </Badge>
          ))}
        </div>

        <div className="flex flex-wrap gap-2 mt-2">
          {candidate?.skills.map((skill: string, index: number) => (
            <Badge key={index} variant="secondary">
              {skill}
            </Badge>
          ))}
        </div>
        <div className="mt-4">
          <Button onClick={()=>navigate(`/schedule-interview?email=${candidate?.email}`)}>Schedule Interview</Button>
        </div>
      </div>
    </div>
  );
}

export default Candidate;
