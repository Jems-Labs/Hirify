import { Link } from "react-router-dom";
import Logo from "./logo";
import { Button } from "./ui/button";

function Navbar() {
  return (
    <div className="border-b">
      <div className="container mx-auto flex items-center justify-between">
        <Link to={"/"}>
          <Logo />
        </Link>
        <div className="flex gap-3">
          <Link to={"/login"}>
            <Button variant="outline">Login</Button>
          </Link>
          <Link to={"/signup"}>
            <Button>Signup</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
