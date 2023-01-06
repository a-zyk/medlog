import PatientForm from "../components/PatientForm";
import PatientList from "../components/PatientList";
import { Card } from "../components/ui/ui";
import { Auth, ThemeSupa } from "@supabase/auth-ui-react";
import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react";

export default function Home() {
  const user = useUser();
  const supabase = useSupabaseClient();
  
  if (!user) {
    return <Auth supabaseClient={supabase} appearance={{ theme: ThemeSupa }} />;
  }

  return (
    <div className="container">
      <Card>
        <PatientForm patient={{}} />
      </Card>
      <PatientList />
    </div>
  );
}
