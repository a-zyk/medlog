import { Card } from "../components/ui/ui";
import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react";
import { Auth, ThemeSupa } from "@supabase/auth-ui-react";
import SeminarForm from "../components/SeminarForm";
import SeminarList from "../components/SeminarList";

export default function Seminars() {
  const user = useUser();
  const supabase = useSupabaseClient();
  if (!user) {
    return <Auth supabaseClient={supabase} appearance={{ theme: ThemeSupa }} />;
  }
  return (
    <>
      <div className="container">
        <Card>
          <SeminarForm seminarItem={{}}/>
        </Card>
        <SeminarList/>
      
      </div>
    </>
  );
}
