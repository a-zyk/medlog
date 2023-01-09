import NavBar from "./NavBar";
import Login from "./Login";
import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react";
import { useEffect, useState } from "react";
import ProfileContext from "../domain/profileContext";

const Layout = ({ children }) => {
  const supabase = useSupabaseClient();
  const user = useUser();
  const [profile, setProfile] = useState({});

  const getProfile = async () => {
    if (user) {
      const { data } = await supabase
        .from("profiles")
        .select()
        .eq("id", user.id)
        .single();
      if (data) setProfile(data);
    }
  };

  useEffect(() => {
    getProfile();
  }, [user]);

  if (!user) {
    return <Login />;
  }

  return (
    <ProfileContext.Provider value={{ profile, setProfile }}>
      <div className="flex">
        <NavBar />
        {children}
      </div>
    </ProfileContext.Provider>
  );
};

export default Layout;
