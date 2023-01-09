import data from "../config/texts/cycleOne/Seminar.json";
import { ErrorWrapper, Button } from "./ui/ui";
import { useState } from "react";
import AbcSelect from "./AbcSelect";
import validate from "../domain/seminarFormError";
import supabase from "../config/SupaBaseClient";
import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react";
const Seminar = ({ seminarItem, onSubmit }) => {
  const user = useUser();
  const currentDate = new Date().toISOString().split("T")[0];
  const [seminar, setSeminar] = useState(seminarItem.seminar || "");
  const [date, setDate] = useState(seminarItem.date || currentDate);
  const [abc, setAbc] = useState(seminarItem.abc || "");
  const [errors, setErrors] = useState({});

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
          <select onChange={(e) => setSeminar(e.target.value)} value={seminar}>
            <option></option>
            {data.map((item) => {
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
        <AbcSelect
          id={seminarItem.id}
          value={abc}
          onChange={(e) => setAbc(e.target.value)}
        />
        {errors.abc ? (
          <ErrorWrapper>Pasirinkite savarankiškumo lygį</ErrorWrapper>
        ) : null}
      </div>
      <Button>Išsaugoti</Button>
    </form>
  );
};

export default Seminar;
