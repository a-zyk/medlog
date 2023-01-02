const validate = (tlkCode, pathDx, patientNum, date, abc) => {
    let currentErrors = {};

    if (!tlkCode.trim().length) {
      currentErrors.tlk = true;
    }

    if (!pathDx.trim().length) {
      currentErrors.pathDx = true;
    }

    if (!patientNum.trim().length) {
        currentErrors.patientNum = true;
      }

    if (!date.trim().length) {
      currentErrors.date = true;
    }

    if (!abc.trim().length) {
      currentErrors.abc = true;
    }

    const valid = !(currentErrors.patientNum || currentErrors.tlk || currentErrors.pathDx || currentErrors.date || currentErrors.abc);

    return {
        valid: valid,
        errors: currentErrors
    }
};

export default validate;