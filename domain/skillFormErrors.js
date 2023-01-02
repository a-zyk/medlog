const validate = (date,departament, patientNum, skill, abc) => {
    let currentErrors = {};

    if (!departament.trim().length) {
      currentErrors.departament = true;
    }

    if (!patientNum.trim().length) {
        currentErrors.patientNum = true;
      }

      if (!skill.trim().length) {
        currentErrors.skill = true;
      }

    if (!date.trim().length) {
      currentErrors.date = true;
    }

    if (!abc.trim().length) {
      currentErrors.abc = true;
    }

    const valid = !(currentErrors.skill || currentErrors.patientNum || currentErrors.departament || currentErrors.date || currentErrors.abc);

    return {
        valid: valid,
        errors: currentErrors
    }
};

export default validate;