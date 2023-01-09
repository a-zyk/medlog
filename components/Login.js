import { AuthWrapper } from "../components/ui/ui";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { Auth, ThemeSupa } from "@supabase/auth-ui-react";

const Login = () => {
  const supabase = useSupabaseClient();

  return (
    <AuthWrapper>
      <Auth supabaseClient={supabase} appearance={{ theme: ThemeSupa }} />;
    </AuthWrapper>
  );
};

export default Login;
