import { Button } from "@/components/ui/button";

function Home() {
  return (
    <div className="px-10 py-16 md:px-20 md:py-24">
      <div className="flex flex-col items-start space-y-6">
        <div className="w-full md:w-1/2">
          <p className="text-5xl md:text-7xl font-semibold leading-tight">
            All-In-One Tech Hiring Platform
          </p>
          <p className="text-lg mt-4 text-gray-400 font-sm max-w-lg">
            Streamline your hiring process with our platform — schedule
            interviews, conduct interviews, and make hiring decisions all in one
            place.
          </p>

          <Button className="mt-7">Get Started</Button>
        </div>

      </div>
    </div>
  );
}

export default Home;
