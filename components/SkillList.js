import Modal from "./ui/Modal";
import SkillForm from "./SkillForm";
import { useEffect, useState } from "react";
import { Card, TableItem, TableHeadItem, TableHead, TableBody } from "./ui/ui";
import { Edit, Delete } from "./ui/icons";
import supabase from "../config/SupaBaseClient";

const skillList = () => {
  const [skills, setSkills] = useState([]);
  const [editingSkill, setEditingSkill] = useState(null);

  const getSkills = async () => {
    const { data, error } = await supabase.from("skills").select();
    if (data && !error) setSkills(data);
  };

  useEffect(() => {
    getSkills();
  }, []);

  const rows = skills.map((skill, i) => {
    return (
      <tr key={i}>
        <TableItem>{i + 1}</TableItem>
        <TableItem>{skill.date}</TableItem>
        <TableItem>{skill.department}</TableItem>
        <TableItem>{skill.patient_num}</TableItem>
        <TableItem>{skill.skill}</TableItem>
        <TableItem>{skill.abc}</TableItem>
        <TableItem className="flex gap-4">
          <Edit onClick={() => setEditingSkill(skill)} />
          <Delete />
        </TableItem>
      </tr>
    );
  });

  return (
    <>
      <Card>
        <div className="flex gap-4 flex-col m-auto max-w-l ">
          <table>
            <TableHead>
              <tr className="text-left">
                <TableHeadItem>Nr.</TableHeadItem>
                <TableHeadItem>Data</TableHeadItem>
                <TableHeadItem>Padalinys</TableHeadItem>
                <TableHeadItem>Pacientas</TableHeadItem>
                <TableHeadItem>Gebėjimas</TableHeadItem>
                <TableHeadItem>Lygis</TableHeadItem>
                <TableHeadItem></TableHeadItem>
              </tr>
            </TableHead>
            <TableBody>{rows}</TableBody>
          </table>
        </div>
      </Card>
      {editingSkill ? (
        <Modal onModalClose={() => setEditingSkill(null)}>
          <SkillForm skillItem={editingSkill} />
        </Modal>
      ) : null}
    </>
  );
};

export default skillList;
