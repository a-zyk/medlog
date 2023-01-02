import data from "../config/texts/diagnosis.json";
import { useState } from "react";
import AbcSelect from "./AbcSelect";
import validate from "../domain/patientFormErrors";
import { ErrorWrapper, Button } from "./ui";

const PatientForm = ({ patient }) => {
  const [pathDx, setPathDx] = useState("");
  const [tlkCode, setTlkCode] = useState("");
  const [abc, setAbc] = useState("");
  const [patientNum, setPatientNum] = useState(patient.patientNum ||  "");
  const [date, setDate] = useState("");
  const [errors, setErrors] = useState({});

  const pathChanged = (e) => {
    const diagnosis = e.currentTarget.value;
    setPathDx(diagnosis);
    const selectedItem = data.find((item) => item.Path_dx === diagnosis);
    if (selectedItem) setTlkCode(selectedItem.TLK_code);
  };

  const onSubmit = (e) => {
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
      // Save to da database
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <div className="grid grid-cols-1 gap-4 m-auto max-w-sm">
        <div>
          <label htmlFor="date">Data</label>
          <input
            onChange={(e) => setDate(e.target.value)}
            id="date"
            type="date"
          />
          {errors.date ? <ErrorWrapper>Pasirinkite datą</ErrorWrapper> : null}
        </div>

        <div>
          <label htmlFor="patient-num">
            Paciento ligos istorijos arba kortelės numeris
          </label>
          <input
            value={patientNum}
            onChange={(e) => setPatientNum(e.target.value)}
            id="patient-num"
            type="text"
          />
          {errors.patientNum ? (
            <ErrorWrapper>Įveskite paciento kortelės numerį</ErrorWrapper>
          ) : null}
        </div>

        <div>
          <label htmlFor="path-dx">Patologinė diagnozė</label>
          <select onChange={pathChanged} id="path-dx">
            <option></option>
            {data.map((diagnosis) => {
              return (
                <option key={diagnosis.TLK_code}>{diagnosis.Path_dx}</option>
              );
            })}
          </select>
          {errors.pathDx ? (
            <ErrorWrapper>Pasirinkite patologinę diagnozę</ErrorWrapper>
          ) : null}
        </div>

        <div>
          <label htmlFor="tlk-code">TLK kodas {tlkCode} </label>
          <input id="tlk-code" type="text" />
          {errors.tlk ? <ErrorWrapper>Įveskite TLK kodą</ErrorWrapper> : null}
        </div>

        <div>
          <label>Savarankiškumo lygis</label>
          <AbcSelect id={patient.id} value={abc} onChange={(e) => setAbc(e.target.value)} />
          {errors.abc ? (
            <ErrorWrapper>Pasirinkite savarankiškumo lygį</ErrorWrapper>
          ) : null}
        </div>
      </div>
      <Button>Išsaugoti</Button>
    </form>
  );
};

export default PatientForm;
