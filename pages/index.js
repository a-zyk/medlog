import PatientForm from "../components/PatientForm";
import PatientList from "../components/PatientList";
import { useRef } from "react";
import { Card } from "../components/ui/ui";
import { Auth, ThemeSupa } from "@supabase/auth-ui-react";
import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react";

export default function Home() {
  const user = useUser();
  const supabase = useSupabaseClient();
  const ListRef = useRef()

  const refreshList = () => {
    ListRef.current.getPatients()
  }
  
  if (!user) {
    return(
      <div className="mt-40 mx-2 w-full container"><Auth supabaseClient={supabase} appearance={{ theme: ThemeSupa }} />;</div>
    ) 
  }

  return (
    <div className="container">
      <Card>
        <PatientForm onSubmit={refreshList} patient={{}} />
      </Card>
      <PatientList ref={ListRef} />
    </div>
  );
}
