const validate = (date, seminar, abc) => {
  let currentErrors = {};

  if (!seminar.trim().length) {
    currentErrors.seminar = true;
  }

  if (!date.trim().length) {
    currentErrors.date = true;
  }

  if (!abc.trim().length) {
    currentErrors.abc = true;
  }

  const valid = !(
    currentErrors.seminar ||
    currentErrors.date ||
    currentErrors.abc
  );

  return {
    valid: valid,
    errors: currentErrors,
  };
};

export default validate;
