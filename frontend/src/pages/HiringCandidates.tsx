import Candidate from "@/components/Candidate";
import CandidatesSidebar from "@/components/CandidatesSidebar";
import { useEffect, useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { BACKEND_URL } from "@/lib/backendUrl";
import axios from "axios";

function HiringCandidates() {
  const [skills, setSkills] = useState<string[]>([]);
  const [roles, setRoles] = useState<string[]>([]);
  const [query, setQuery] = useState<string>("");
  const [candidates, setCandidates] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  async function fetchCandidates() {
    setIsLoading(true);
    try {
      const data = { skills, roles, query };
      const res = await axios.post(
        `${BACKEND_URL}/api/user/find-candidates`,
        data,
        { withCredentials: true }
      );
      if (res.status === 200) {
        setCandidates(res.data);
      }
    } catch (error) {
      console.error("Error fetching candidates:", error);
    }
    setIsLoading(false);
  }

  useEffect(() => {
    fetchCandidates();
  }, [skills, roles]);

  return (
    <div className="flex w-full">
      <CandidatesSidebar
        skills={skills}
        setSkills={setSkills}
        roles={roles}
        setRoles={setRoles}
      />

      <div className="px-5 flex-1">
        <div className="flex gap-2 items-center border rounded-lg p-2 my-3 w-full">
          <Search />
          <Input
            placeholder="Search by name or skills (e.g., John Doe, React, UI/UX)..."
            className="border-none flex-1"
            value={query}
            onChange={handleSearchChange}
          />
          <Button className="w-24" onClick={fetchCandidates}>
            Search
          </Button>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-3 gap-4">
            {Array.from({ length: 5 }).map((_, index) => (
              <div className="flex flex-col space-y-3" key={index}>
                <Skeleton className="h-[300px] w-[350px] rounded-xl" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-[350px]" />
                  <Skeleton className="h-4 w-[300px]" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-3 gap-4">
            {candidates.length > 0 ? (
              candidates.map((candidate, index) => (
                <Candidate key={index} candidate={candidate} />
              ))
            ) : (
              <p className="text-gray-500">No candidates found.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default HiringCandidates;
