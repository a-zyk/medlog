import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react";
const Profile = () => {
  const user = useUser();
  const supabase = useSupabaseClient();

  if (!user) {
    return <Auth supabaseClient={supabase} appearance={{ theme: ThemeSupa }} />;
  }
  return (
    <div>
      <div>{user.email}</div>
    </div>
  );
};

export default Profile;
