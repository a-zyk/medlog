import { Card } from "../components/ui/ui";
import { useContext, useState, useEffect } from "react";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import SkillForm from "../components/SkillForm";
import SkillList from "../components/SkillList";
import Statistics from "../components/SkillsStatistics";
import Modal from "../components/ui/Modal";
import profileContext from "../domain/profileContext";
import cycleOneSkills from "../domain/texts/cycleOne/Skills.json";
import cycleTwoSkills from "../domain/texts/cycleTwo/Skills.json";
import cycleThreeSkills from "../domain/texts/cycleThree/Skills.json";
import skillStats from "../domain/stats/skills";

export default function Skills() {
  const supabase = useSupabaseClient();
  const [cycle, setCycle] = useState([]);
  const [stats, setStats] = useState({});
  const [skills, setSkills] = useState([]);
  const [editingSkill, setEditingSkill] = useState(null);
  const { profile } = useContext(profileContext);
  const availableSkills = [cycleOneSkills, cycleTwoSkills, cycleThreeSkills];

  const getSkills = async () => {
    const { data, error } = await supabase
      .from("skills")
      .select()
      .eq("cycle", profile.current_cycle)
      .order("date", { ascending: false });
    if (data && !error) {
      setSkills(data);
    }
    setEditingSkill(null);
  };

  useEffect(() => {
    getSkills();
    if (profile && profile.current_cycle) {
      const currentCycle = parseInt(profile.current_cycle);
      setCycle(availableSkills[currentCycle - 1]);
    }
  }, [profile]);

  useEffect(() => {
    setStats(skillStats(skills, cycle));
  }, [cycle, skills]);

  return (
    <>
      <div>
        <Card>
          <SkillForm onSubmit={getSkills} skillItem={{}} />
        </Card>
        <div className="w-full mt-4">
          <SkillList
            setEditingSkill={setEditingSkill}
            skills={skills}
            refresh={getSkills}
          />
        </div>
        <div className="mt-4">
          <Statistics stats={stats} />
        </div>

        {editingSkill ? (
          <Modal onModalClose={() => setEditingSkill(null)}>
            <SkillForm onSubmit={getSkills} skillItem={editingSkill} />
          </Modal>
        ) : null}
      </div>
    </>
  );
}
