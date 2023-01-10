import { useState, useEffect, useContext } from "react";
import AbcSelect from "./AbcSelect";
import validate from "../domain/skillFormErrors";
import { Button, ErrorWrapper } from "./ui/ui";
import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react";
import profileContext from "../domain/profileContext";
import cycleOne from "../domain/texts/cycleOne/Skills.json";
import cycleTwo from "../domain/texts/cycleTwo/Skills.json";
import cycleThree from "../domain/texts/cycleThree/Skills.json";

const SkillForm = ({ skillItem, onSubmit }) => {
  const user = useUser();
  const supabase = useSupabaseClient();
  const { profile } = useContext(profileContext);
  const [abc, setAbc] = useState(skillItem.abc || "");
  const [patientNum, setPatientNum] = useState(skillItem.patient_num || "");
  const currentDate = new Date().toISOString().split("T")[0];
  const [date, setDate] = useState(skillItem.date || currentDate);
  const [department, setDepartment] = useState(skillItem.department || "");
  const [skill, setSkill] = useState(skillItem.skill || "");
  const [errors, setErrors] = useState({});
  const [currentSkills, setCurrentSkills] = useState([]);
  const availableSkills = [cycleOne, cycleTwo, cycleThree];

  useEffect(() => {
    if (profile && profile.current_cycle) {
      const currentCycle = parseInt(profile.current_cycle);
      setCurrentSkills(availableSkills[currentCycle - 1]);
    }
  }, [profile]);

  const onFormSubmit = async (e) => {
    e.preventDefault();
    const { valid, errors: currentErrors } = validate(
      date,
      department,
      patientNum,
      skill,
      abc
    );

    setErrors(currentErrors);

    if (valid) {
      if (skillItem.id) {
        const { error } = await supabase
          .from("skills")
          .update({
            date,
            department,
            skill,
            abc,
            patient_num: patientNum,
          })
          .eq("id", skillItem.id);
      } else {
        const { error } = await supabase.from("skills").insert({
          date,
          department,
          skill,
          abc,
          patient_num: patientNum,
          user_id: user.id,
        });
        setAbc("");
        setDate(currentDate);
        setDepartment("");
        setPatientNum("");
        setSkill("");
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
          {errors.date ? <ErrorWrapper>Pasirinkite datą</ErrorWrapper> : null}
        </div>

        <div>
          <label htmlFor="department">Padalinys</label>
          <input
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
            id="department"
            type="text"
          />
          {errors.patientNum ? (
            <ErrorWrapper>Įveskite padalinio pavadinimą</ErrorWrapper>
          ) : null}
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
            {currentSkills.map((item) => {
              return (
                <option value={item.skill} key={item.skill}>
                  {item.skill}
                </option>
              );
            })}
          </select>
          {errors.skill ? (
            <ErrorWrapper>Pasirinkite gebėjimą</ErrorWrapper>
          ) : null}
        </div>

        <div>
          <label>Savarankiškumo lygis</label>
          <AbcSelect
            id={skillItem.id}
            value={abc}
            onChange={(e) => setAbc(e.target.value)}
          />
          {errors.abc ? (
            <ErrorWrapper>Pasirinkite savarankiškumo lygį</ErrorWrapper>
          ) : null}
        </div>
      </div>
      <div className="mt-4 w-full flex justify-end">
        <Button className="w-full md:w-auto">Išsaugoti</Button>
      </div>
    </form>
  );
};

export default SkillForm;
