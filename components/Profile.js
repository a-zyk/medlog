import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react";
import { Auth, ThemeSupa } from "@supabase/auth-ui-react";
import { useEffect, useState } from "react";
import Router from 'next/router'

const Profile = () => {
  const user = useUser();
  const supabase = useSupabaseClient();
  const [currentCycle, setCurrentCycle] = useState('');
  const [profile, setProfile] = useState(null);

  const getProfile = async () => {
    if (user) {
      const { data, error } = await supabase
        .from("profiles")
        .select()
        .eq("id", user.id)
        .single();

      if (data) {
        setProfile(data);
        setCurrentCycle(data.current_cycle);
      }
    }
  };

  useEffect(() => {
    getProfile();
  }, [user]);

  const update = async () => {
    if (user) {
      const { data, error } = await supabase
        .from("profiles")
        .update({ current_cycle: currentCycle })
        .select()
        .eq("id", user.id);

      if (error) console.log(error);
      if (data) Router.reload(window.location.pathname)
    }
  };

  if (!user) {
    return <Auth supabaseClient={supabase} appearance={{ theme: ThemeSupa }} />;
  }
  return (
    <div className="container mt-10 m-auto max-w-sm ">
      <div className="">El. paštas: {user.email}</div>
      <div className="mt-3">Ciklas:</div>
      <select value={currentCycle} onChange={(e) => setCurrentCycle(e.target.value)}>
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
      <button onClick={update}>Saugoti</button>
    </div>
  );
};

export default Profile;
