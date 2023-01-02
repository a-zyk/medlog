import data from "../config/texts/skills.json";
import { useState } from "react";
import AbcSelect from "./AbcSelect";
import validate from "../domain/skillFormErrors";
import { Button, ErrorWrapper } from "./ui";

const SkillForm = ({skillItem}) => {
  console.log(skillItem)
  const [abc, setAbc] = useState(skillItem.abc || "");
  const [patientNum, setPatientNum] = useState(skillItem.patientNum || "");
  const [date, setDate] = useState(skillItem.date || "");
  const [departament, setDepartament] = useState(skillItem.departament ||  "");
  const [skill, setSkill] = useState(skillItem.skill || "");
  const [errors, setErrors] = useState({});

  const onSubmit = (e) => {
    e.preventDefault();
    const { valid, errors: currentErrors } = validate(
      date,
      departament,
      patientNum,
      skill,
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
            value={date}
              onChange={(e) => setDate(e.target.value)}
              id="date"
              type="date"
            />
            {errors.date ? <ErrorWrapper>Pasirinkite datą</ErrorWrapper> : null}
          </div>

          <div>
            <label htmlFor="departament">Padalinys</label>
            <input
            value={departament}
              onChange={(e) => setDepartament(e.target.value)}
              id="departament"
              type="text"
            />
            {errors.patientNum ? (
              <ErrorWrapper>Įveskite padalinio pavadinimą</ErrorWrapper>
            ) : null}
          </div>

          <div>
            <label htmlFor="patient-num">
              Paciento ligos istorijos ar ambulatorinės kortelės Nr.
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
            <label htmlFor="skill">Gebėjimas</label>
            <select
            value={skill}
              onChange={(e) => setSkill(e.currentTarget.value)}
              id="skill"
            >
              <option></option>
              {data.map((item) => {
                return <option value={item.skill} key={item.skill}>{item.skill}</option>;
              })}
            </select>
            {errors.skill ? <ErrorWrapper>Pasirinkite gebėjimą</ErrorWrapper> : null}
          </div>

          <div>
            <label>Savarankiškumo lygis</label>
            <AbcSelect id={skillItem.id} value={abc} onChange={(e) => setAbc(e.target.value)} />
            {errors.abc ? <ErrorWrapper>Pasirinkite savarankiškumo lygį</ErrorWrapper> : null}
          </div>
        </div>
        <Button>Išsaugoti</Button>
    </form>
  );
};

export default SkillForm;
