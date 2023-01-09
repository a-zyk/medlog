import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react";
import { Auth, ThemeSupa } from "@supabase/auth-ui-react";
import { useEffect, useState, useContext } from "react";
import { Button } from "./ui/ui";
import Router from "next/router";
import profileContext from "../domain/profileContext";

const Profile = () => {
  const user = useUser();
  const supabase = useSupabaseClient();
  const { profile, setProfile } = useContext(profileContext);
  const [currentCycle, setCurrentCycle] = useState("");

  useEffect(() => {
    if (profile) setCurrentCycle(profile.current_cycle);
  }, [profile]);

  const update = async () => {
    if (user) {
      const { data, error } = await supabase
        .from("profiles")
        .update({ current_cycle: currentCycle })
        .select()
        .eq("id", user.id)
        .single();

      if (error) console.log(error);
      if (data) setProfile(data)
    }
  };

  return (
    <div className="container mt-10 m-auto max-w-sm ">
      <div className="">El. paštas: {user.email}</div>
      <div className="mt-3">Ciklas:</div>
      <select
        value={currentCycle}
        onChange={(e) => setCurrentCycle(e.target.value)}
      >
        <option></option>
        <option value={1}>
          Ciklas I (Traumos, aplinkos žalingo poveikio sukeltų ir neurologinių
          kritinių būklių intensyvioji terapija)
        </option>
        <option value={2}>
          Ciklas II (Intensyvioji terapija nefrologijoje ir toksikologijoje)
        </option>
        <option value={3}>
          Ciklas III (Intensyvioji terapija gastroenterologijoje)
        </option>
      </select>
      <Button onClick={update}>Saugoti</Button>
    </div>
  );
};

export default Profile;
