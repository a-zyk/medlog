import PatientForm from "../components/PatientForm";
import PatientList from "../components/PatientList";
import { useRef, useContext } from "react";
import { Card } from "../components/ui/ui";
import profileContext from "../domain/profileContext";

export default function Home() {
  const ListRef = useRef();

  const refreshList = () => {
    ListRef.current.getPatients();
  };

  return (
    <div>
      <Card>
        <PatientForm onSubmit={refreshList} patient={{}} />
      </Card>
      <div className="w-full mt-4">
        <PatientList ref={ListRef} />
      </div>
    </div>
  );
}
