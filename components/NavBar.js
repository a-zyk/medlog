import Link from "next/link";
import { NavItem } from "./ui";
import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react";

const NavBar = () => {
  const user = useUser()

  return (
    <nav className="w-64 h-screen overflow-y-auto py-4 px-3 bg-gray-50 rounded dark:bg-gray-800 flex flex-col">
      <div>Ciklas I</div>
      <Link href="/">
        <NavItem>Pacientai</NavItem>
      </Link>
      <Link href="/skills">
        <NavItem>Įgudžiai</NavItem>
      </Link>

      <div className="flex-grow" />
      
      {user ? user.email : <Link href="/">Sign in</Link>}
    </nav>
  );
};

export default NavBar;
