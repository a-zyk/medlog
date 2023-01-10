import Link from "next/link";
import { NavItem } from "./ui/ui";
import { Menu } from "./ui/icons";
import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react";
import User from "./Profile";
import { useState, useContext } from "react";
import Profile from "./Profile";
import profileContext from "../domain/profileContext";

const NavBar = () => {
  const [sideBarShow, setSideBarShow] = useState(false);
  const { profile } = useContext(profileContext)
  const client = useSupabaseClient();
  const user = useUser()

  const signOut = async () => {
    const { error } = await client.auth.signOut();
  };

  if (!profile) return;

  return (
    <>
      <div className="md:hidden absolute z-10">
        <Menu onClick={() => setSideBarShow((previous) => !previous)} />
      </div>

      <nav
        onClick={() => setSideBarShow(false)}
        className={`${
          sideBarShow ? "flex" : "hidden"
        } absolute md:relative md:flex w-64 h-screen overflow-y-auto py-4 px-3 bg-gray-50 rounded flex-col`}
      >
        {profile.current_cycle ? (
          <>
            <div className="flex">Ciklas {profile.current_cycle}</div>

            <Link href="/">
              <NavItem>Pacientai</NavItem>
            </Link>
            <Link href="/skills">
              <NavItem>Įgudžiai</NavItem>
            </Link>
            <Link href="/seminars">
              <NavItem>Seminarai</NavItem>
            </Link>
          </>
        ) : (
          <>
            <Link href="/profile">Pasirinkti ciklą</Link>
          </>
        )}
        <div className="flex-grow" />
        <Link href="/profile">
          <NavItem>Profilis</NavItem>
        </Link>
        <NavItem className="mb-4">
          <button onClick={signOut}>Atsijungti</button>
        </NavItem>
      </nav>
    </>
  );
};

export default NavBar;
