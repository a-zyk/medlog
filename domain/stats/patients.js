const patientStats = (patients, cycle) => {
  if (!Object.keys(cycle).length) return {};

  let stats = {};
  cycle.forEach((diagnosis) => {
    stats[diagnosis.pathDx] = {
      min_procedures: diagnosis.min_procedures,
      min_A: diagnosis.A,
      min_B: diagnosis.B,
      min_C: diagnosis.C,
      A: 0,
      B: 0,
      C: 0,
    };
  });

  patients.forEach((patient) => {
    stats[patient.pathDx][patient.abc] += 1;
  });

  return stats;
};

export default patientStats;
