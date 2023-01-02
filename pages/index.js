import PatientForm from "../components/PatientForm";
import PatientList from "../components/PatientList";
import { Card } from "../components/ui";
export default function Home() {
  return (
    <div className="container">
      <Card>
        <PatientForm patient={{}} />
      </Card>
      <PatientList />
    </div>
  );
}
