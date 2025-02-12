import Logo from "./logo";
import { Button } from "./ui/button";

function Navbar() {
  return (
    <div className="border-b">
      <div className="container mx-auto flex items-center justify-between">
        <Logo />

        <div className="flex gap-3">
          <Button variant="outline">Login</Button>
          <Button>Signup</Button>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
