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
    <div className="container">
      <Card>
        <PatientForm onSubmit={refreshList} patient={{}} />
      </Card>
      <PatientList ref={ListRef} />
    </div>
  );
}
