import PatientForm from "../components/PatientForm";
import PatientList from "../components/PatientList";
import { useContext, useState, useEffect } from "react";
import { Card } from "../components/ui/ui";
import patientStats from "../domain/stats/patients";
import Modal from "../components/ui/Modal";
import profileContext from "../domain/profileContext";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import cycleOneDiagnosis from "../domain/texts/cycleOne/Diagnosis.json";
import cycleTwoDiagnosis from "../domain/texts/cycleTwo/Diagnosis.json";
import cycleThreeDiagnosis from "../domain/texts/cycleThree/Diagnosis.json";
import Statistics from "../components/PatientStatistics";
export default function Home() {
  const supabase = useSupabaseClient();
  const [editingPatient, setEditingPatient] = useState(null);
  const [patients, setPatients] = useState([]);
  const [cycle, setCycle] = useState([]);
  const [stats, setStats] = useState({});
  const { profile } = useContext(profileContext);

  const availableDiagnoses = [
    cycleOneDiagnosis,
    cycleTwoDiagnosis,
    cycleThreeDiagnosis,
  ];

  const getPatients = async () => {
    const { data, error } = await supabase
      .from("patients")
      .select()
      .eq("cycle", profile.current_cycle)
      .order("date", { ascending: false });

    if (data && !error) {
      setPatients(data);
    }
    setEditingPatient(null);
  };

  useEffect(() => {
    getPatients();

    if (profile && profile.current_cycle) {
      const currentCycle = parseInt(profile.current_cycle);
      setCycle(availableDiagnoses[currentCycle - 1]);
    }
  }, [profile]);

  useEffect(() => {
    setStats(patientStats(patients, cycle));
  }, [cycle, patients]);

  return (
    <div>
      <Card>
        <PatientForm onSubmit={getPatients} patient={{}} />
      </Card>
      <div className="w-full mt-4">
        <PatientList
          setEditingPatient={setEditingPatient}
          patients={patients}
          refresh={getPatients}
        />
      </div>

      <Statistics stats={stats} />

      {editingPatient ? (
        <Modal onModalClose={() => setEditingPatient(null)}>
          <PatientForm onSubmit={getPatients} patient={editingPatient} />
        </Modal>
      ) : null}
    </div>
  );
}
