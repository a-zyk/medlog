import { useState, useEffect, useContext } from "react";
import AbcSelect from "./AbcSelect";
import validate from "../domain/patientFormErrors";
import { ErrorWrapper, Button } from "./ui/ui";
import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react";
import cycleOneDiagnosis from "../domain/texts/cycleOne/Diagnosis.json";
import cycleTwoDiagnosis from "../domain/texts/cycleTwo/Diagnosis.json";
import cycleThreeDiagnosis from "../domain/texts/cycleThree/Diagnosis.json";
import profileContext from "../domain/profileContext";

const PatientForm = ({ patient, onSubmit }) => {
  const supabase = useSupabaseClient();
  const user = useUser();
  const { profile } = useContext(profileContext);
  const [pathDx, setPathDx] = useState(patient.pathDx || "");
  const [tlkCode, setTlkCode] = useState(patient.tlkCode || "");
  const [tlkCodeSuggestion, setTlkCodeSuggestion] = useState("");
  const [abc, setAbc] = useState(patient.abc || "");
  const [patientNum, setPatientNum] = useState(patient.patient_num || "");
  const currentDate = new Date().toISOString().split("T")[0];
  const [date, setDate] = useState(patient.date || currentDate);
  const [errors, setErrors] = useState({});
  const [diagnoses, setDiagnoses] = useState([]);

  const availableDiagnoses = [
    cycleOneDiagnosis,
    cycleTwoDiagnosis,
    cycleThreeDiagnosis,
  ];
  useEffect(() => {
    if (profile && profile.current_cycle) {
      const currentCycle = parseInt(profile.current_cycle);
      setDiagnoses(availableDiagnoses[currentCycle - 1]);
    }
  }, [profile]);

  const pathChanged = (e) => {
    const diagnosis = e.currentTarget.value;
    setPathDx(diagnosis);
    const selectedItem = diagnoses.find((item) => item.pathDx === diagnosis);
    if (selectedItem) setTlkCodeSuggestion(selectedItem.tlkCode);
  };

  const onFormSubmit = async (e) => {
    e.preventDefault();
    const { valid, errors: currentErrors } = validate(
      tlkCode,
      pathDx,
      patientNum,
      date,
      abc
    );

    setErrors(currentErrors);
    if (valid) {
      if (patient.id) {
        const { error } = await supabase
          .from("patients")
          .update({
            tlkCode,
            pathDx,
            patient_num: patientNum,
            date,
            abc,
          })
          .eq("id", patient.id);
      } else {
        const { error } = await supabase.from("patients").insert({
          tlkCode,
          pathDx,
          patient_num: patientNum,
          date,
          abc,
          user_id: user.id,
          cycle: profile.current_cycle
        });
        setTlkCode("");
        setPathDx("");
        setPatientNum("");
        setDate(currentDate);
        setAbc("");
      }

      onSubmit();
    }
  };

  return (
    <form onSubmit={onFormSubmit}>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <div>
          <label htmlFor="date">Data</label>
          <input
            value={date}
            onChange={(e) => setDate(e.target.value)}
            id="date"
            type="date"
          />
          {errors.date ? <ErrorWrapper>Pasirinkite dat??</ErrorWrapper> : null}
        </div>

        <div>
          <label htmlFor="patient-num">Paciento numeris</label>
          <input
            value={patientNum}
            onChange={(e) => setPatientNum(e.target.value)}
            id="patient-num"
            type="text"
          />
          {errors.patientNum ? (
            <ErrorWrapper>??veskite paciento kortel??s numer??</ErrorWrapper>
          ) : null}
        </div>

        <div>
          <label htmlFor="path-dx">Patologin?? diagnoz??</label>

          <select value={pathDx} onChange={pathChanged} id="path-dx">
            <option></option>
            {diagnoses.map((diagnosis) => {
              return (
                <option value={diagnosis.pathDx} key={diagnosis.tlkCode}>
                  {diagnosis.pathDx}
                </option>
              );
            })}
          </select>
          {errors.pathDx ? (
            <ErrorWrapper>Pasirinkite patologin?? diagnoz??</ErrorWrapper>
          ) : null}
        </div>

        <div>
          <label htmlFor="tlk-code">TLK kodas {tlkCodeSuggestion} </label>
          <input
            value={tlkCode}
            onChange={(e) => setTlkCode(e.target.value)}
            id="tlk-code"
            type="text"
          />
          {errors.tlk ? <ErrorWrapper>??veskite TLK kod??</ErrorWrapper> : null}
        </div>

        <div>
          <label>Savaranki??kumo lygis</label>
          <AbcSelect
            id={patient.id}
            value={abc}
            onChange={(e) => setAbc(e.target.value)}
          />
          {errors.abc ? (
            <ErrorWrapper>Pasirinkite savaranki??kumo lyg??</ErrorWrapper>
          ) : null}
        </div>
      </div>
      <div className="mt-4 w-full flex justify-end">
        <Button className="w-full md:w-auto">I??saugoti</Button>
      </div>
    </form>
  );
};

export default PatientForm;
