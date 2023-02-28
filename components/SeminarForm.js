import { ErrorWrapper, Button } from "./ui/ui";
import { useState, useEffect, useContext } from "react";
import AbcSelect from "./AbcSelect";
import validate from "../domain/seminarFormError";
import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react";
import profileContext from "../domain/profileContext";
import cycleOne from "../domain/texts/cycleOne/Seminars.json";
import cycleTwo from "../domain/texts/cycleTwo/Seminars.json";
import cycleThree from "../domain/texts/cycleThree/Seminars.json";

const Seminar = ({ seminarItem, onSubmit }) => {
  const user = useUser();
  const supabase = useSupabaseClient();
  const { profile } = useContext(profileContext);
  const currentDate = new Date().toISOString().split("T")[0];
  const [seminar, setSeminar] = useState(seminarItem.seminar || "");
  const [date, setDate] = useState(seminarItem.date || currentDate);
  const [abc, setAbc] = useState(seminarItem.abc || "");
  const [errors, setErrors] = useState({});
  const [currentSeminar, setCurrentSeminar] = useState([]);
  const availableSeminars = [cycleOne, cycleTwo, cycleThree];

  useEffect(() => {
    if (profile && profile.current_cycle) {
      const currentCycle = parseInt(profile.current_cycle);
      setCurrentSeminar(availableSeminars[currentCycle - 1]);
    }
  }, [profile]);
  const onFormSubmit = async (e) => {
    e.preventDefault();
    const { valid, errors: currentErrors } = validate(date, seminar, abc);
    setErrors(currentErrors);
    if (valid) {
      if (seminarItem.id) {
        const { error } = await supabase
          .from("seminars")
          .update({
            date,
            seminar,
            abc,
          })
          .eq("id", seminarItem.id);
      } else {
        const { error } = await supabase.from("seminars").insert({
          date,
          seminar,
          abc,
          cycle: profile.current_cycle,
          user_id: user.id,
        });
        setAbc("");
        setDate(currentDate);
        setSeminar("");
      }
      onSubmit();
    }
  };
  return (
    <form onSubmit={onFormSubmit}>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
          <label htmlFor="seminar">Seminaras</label>

          <select
            onChange={(e) => setSeminar(e.target.value)}
            value={seminar}
            id="seminar"
          >
            <option></option>
            {currentSeminar.map((item) => {
              return (
                <option value={item.seminar} key={item.seminar}>
                  {item.seminar}
                </option>
              );
            })}
          </select>
          {errors.seminar ? (
            <ErrorWrapper>Pasirinkite seminarą</ErrorWrapper>
          ) : null}
        </div>
        <div>
          <label>Savarankiškumo ygis</label>

          <AbcSelect
            id={seminarItem.id}
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

export default Seminar;
