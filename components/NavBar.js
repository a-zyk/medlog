import Link from "next/link";
import { NavItem } from "./ui";
const NavBar = () => {
  return (
    <nav className="w-64 overflow-y-auto py-4 px-3 bg-gray-50 rounded dark:bg-gray-800">
      <div>Ciklas I</div>
      <Link href="/">
        <NavItem>Pacientai</NavItem>
      </Link>
      <Link href="/skills">
        <NavItem>Įgudžiai</NavItem>
      </Link>
    </nav>
  );
};

export default NavBar;
