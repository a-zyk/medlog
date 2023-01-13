const skillStats = (skills, cycle) => {
    if (!Object.keys(cycle).length) return {};
    if (!skills.length) return {}
  
    let stats = {};
    cycle.forEach((skill) => {
      stats[skill.skill] = {
      
        min_A: skill.A,
        min_B: skill.B,
        min_C: skill.C,
        A: 0,
        B: 0,
        C: 0,
      };
    });
  
    skills.forEach((skill) => {
      if (!stats[skill.skill]) console.log(stats, skill.skill, cycle)
      stats[skill.skill][skill.abc] += 1;
    });
  
    return stats;
  };
  
  export default skillStats;
  