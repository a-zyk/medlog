import Link from "next/link";
import { NavItem } from "./ui/ui";
import { Menu } from "./ui/icons";
import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react";
import User from "./Profile";
import { useEffect, useState } from "react";
import supabase from "../config/SupaBaseClient";

const NavBar = () => {
  const [sideBarShow, setSideBarShow] = useState(false);
  const [profile, setProfile] = useState(null);
  const user = useUser();
  useEffect(() => {
    getProfile();
  }, [user]);

  const getProfile = async () => {
    if (user) {
      const { data, error } = await supabase
        .from("profiles")
        .select()
        .eq("id", user.id)
        .single();

      if (data) {
        console.log(data);
        setProfile(data);
      }
    }
  };

  const updateCurrentCycle = async (e) => {
    if (user) {
      const { data, error } = await supabase
        .from("profiles")
        .upsert({ current_cycle: parseInt(e.target.value) })
        .select()
        .eq("id", user.id);

      if (error) console.log(error);
      if (data) console.log(data);
    }
  };

  const cycleSelect = (
    <select
      value={profile && profile.current_cycle}
      onChange={updateCurrentCycle}
    >
      <option></option>
      <option value={1}>
        Ciklas I (Traumos, aplinkos žalingo poveikio sukeltų ir neurologinių
        kritinių būklių intensyvioji terapija)
      </option>
      <option value={2}>
        Ciklas II ( Intensyvioji terapija nefrologijoje ir toksikologijoje)
      </option>
      <option value={3}>
        Ciklas III ( Intensyvioji terapija gastroenterologijoje)
      </option>
    </select>
  );
  ``;

  return (
    <>
      <div className="md:hidden absolute z-10">
        <Menu onClick={() => setSideBarShow(previous => !previous)}/>
      </div>

      <nav
        className={`${
          sideBarShow ? "flex" : "hidden"
        } absolute md:relative md:flex w-64 h-screen overflow-y-auto py-4 px-3 bg-gray-50 rounded dark:bg-gray-800 flex-col`}
      >
        <div>Ciklas I</div>

        <Link href="/">
          <NavItem>Pacientai</NavItem>
        </Link>
        <Link href="/skills">
          <NavItem>Įgudžiai</NavItem>
        </Link>
        <Link href="/seminars">
          <NavItem>Seminarai</NavItem>
        </Link>
        <div className="flex-grow" />

        {user ? user.email : <Link href="/">Sign in</Link>}

        {profile ? (
          <>
            {profile.current_cycle}
            {cycleSelect}
          </>
        ) : null}
      </nav>
    </>
  );
};

export default NavBar;
