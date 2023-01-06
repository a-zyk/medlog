import data from "../config/texts/cycleOne/Seminar.json";
import { ErrorWrapper, Button } from "./ui/ui";
import { useState } from "react";
import AbcSelect from "./AbcSelect";
import validate from "../domain/seminarFormError";
const Seminar = ({seminarItem}) => {
  const currentDate = new Date().toISOString().split("T")[0];
  const [seminar, setSeminar] = useState(seminarItem.seminar || "");
  const [date, setDate] = useState(currentDate || '');
  const [abc, setAbc] = useState(seminarItem.abc || "");
  const [errors, setErrors] = useState({});

  const onSubmit = (e) => {
    e.preventDefault();
    const { valid, errors: currentErrors } = validate(date, seminar, abc);
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
          {errors.pathDx ? (
            <ErrorWrapper>Pasirinkite patologinę diagnozę</ErrorWrapper>
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
