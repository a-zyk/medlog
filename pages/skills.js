import SkillForm from "../components/SkillForm";
import SkillList from "../components/SkillList";
import { Card } from "../components/ui/ui";
import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react";
import { Auth, ThemeSupa } from "@supabase/auth-ui-react";

export default function Skills() {
  const user = useUser();
  const supabase = useSupabaseClient();
  if (!user) {
    return <Auth supabaseClient={supabase} appearance={{ theme: ThemeSupa }} />;
  }
  return (
    <>
      <div className="container">
        <Card>
          <SkillForm skillItem={{}} />
        </Card>
        <SkillList />
      </div>
    </>
  );
}
