const AbcSelect = ({ onChange, value, id}) => {
  return (
    <div className="grid w-full grid-cols-3 space-x-2 rounded-xl bg-gray-50 border border-gray-300 p-2">
      <div>
        <input
          onChange={onChange}
          checked={value === "A"}
          type="radio"
          value="A"
          name="option"
          id={`A${id}`}
          className="peer hidden"
        />
        <label
          htmlFor={`A${id}`}
          className="block cursor-pointer select-none rounded-xl p-2 text-center peer-checked:bg-blue-500 peer-checked:font-bold peer-checked:text-white"
        >
          A
        </label>
      </div>

      <div>
        <input
          onChange={onChange}
          checked={value === "B"}
          type="radio"
          value="B"
          name="option"
          id={`B${id}`}
          className="peer hidden"
        />
        <label
          htmlFor={`B${id}`}
          className="block cursor-pointer select-none rounded-xl p-2 text-center peer-checked:bg-blue-500 peer-checked:font-bold peer-checked:text-white"
        >
          B
        </label>
      </div>

      <div>
        <input
          onChange={onChange}
          checked={value === "C"}
          type="radio"
          value="C"
          name="option"
          id={`C${id}`}
          className="peer hidden"
        />
        <label
          htmlFor={`C${id}`}
          className="block cursor-pointer select-none rounded-xl p-2 text-center peer-checked:bg-blue-500 peer-checked:font-bold peer-checked:text-white"
        >
          C
        </label>
      </div>
    </div>
  );
};

export default AbcSelect;
