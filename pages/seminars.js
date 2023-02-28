import { Card } from "../components/ui/ui";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useState, useEffect, useContext } from "react";
import profileContext from "../domain/profileContext";
import Modal from "../components/ui/Modal";
import SeminarForm from "../components/SeminarForm";
import SeminarList from "../components/SeminarList";
import cycleOneSeminars from "../domain/texts/cycleOne/Seminars.json";
import cycleTwoSeminars from "../domain/texts/cycleTwo/Seminars.json";
import cycleThreeSeminars from "../domain/texts/cycleThree/Seminars.json";

export default function Seminars() {
  const supabase = useSupabaseClient();
  const [cycle, setCycle] = useState([]);
  const [seminars, setSeminars] = useState([]);
  const [editingSeminar, setEditingSeminar] = useState(null);
  const { profile } = useContext(profileContext);
  const availableSeminars = [
    cycleOneSeminars,
    cycleTwoSeminars,
    cycleThreeSeminars,
  ];

  const getSeminars = async () => {
    const { data, error } = await supabase
      .from("seminars")
      .select()
      .eq("cycle", profile.current_cycle)
      .order("date", { ascending: false });
    if (data && !error) {
      setSeminars(data);
    }
    setEditingSeminar(null);
  };

  useEffect(() => {
    getSeminars();
    if (profile && profile.current_cycle) {
      const currentCycle = parseInt(profile.current_cycle);
      setCycle(availableSeminars[currentCycle - 1]);
    }
  }, [profile]);

  return (
    <>
      <div>
        <Card>
          <SeminarForm onSubmit={getSeminars} seminarItem={{}} />
        </Card>
        <div className="w-full mt-4">
          <SeminarList
            seminars={seminars}
            setEditingSeminar={setEditingSeminar}
            refresh={getSeminars}
          />
        </div>
        {editingSeminar ? (
          <Modal onModalClose={() => setEditingSeminar(null)}>
            <SeminarForm onSubmit={getSeminars} seminarItem={editingSeminar} />
          </Modal>
        ) : null}
      </div>
    </>
  );
}
