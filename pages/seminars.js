import { Card } from "../components/ui/ui";
import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react";
import { Auth, ThemeSupa } from "@supabase/auth-ui-react";
import { useRef } from "react";
import SeminarForm from "../components/SeminarForm";
import SeminarList from "../components/SeminarList";

export default function Seminars() {
  const user = useUser();
  const supabase = useSupabaseClient();
  const ListRef = useRef();
  const refreshList = () => {
    ListRef.current.getSeminars();
  };

  if (!user) {
    return <Auth supabaseClient={supabase} appearance={{ theme: ThemeSupa }} />;
  }
  return (
    <>
      <div className="container">
        <Card>
          <SeminarForm onSubmit={refreshList} seminarItem={{}} />
        </Card>
        <SeminarList ref={ListRef} />
      </div>
    </>
  );
}
