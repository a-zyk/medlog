import SkillForm from "../components/SkillForm";
import SkillList from "../components/SkillList";
import { Card } from "../components/ui/ui";
import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react";
import { Auth, ThemeSupa } from "@supabase/auth-ui-react";
import { useRef } from "react";

export default function Skills() {
  const user = useUser();
  const supabase = useSupabaseClient();
  const ListRef = useRef()

  const refreshList = () => {
    ListRef.current.getSkills()
  }
  if (!user) {
    return <Auth supabaseClient={supabase} appearance={{ theme: ThemeSupa }} />;
  }
  return (
    <>
      <div className="container">
        <Card>
          <SkillForm  onSubmit={refreshList} skillItem={{}} />
        </Card>
        <SkillList ref={ListRef} />
      </div>
    </>
  );
}
