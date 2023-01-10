import Modal from "./ui/Modal";
import SkillForm from "./SkillForm";
import { useEffect, useState, useImperativeHandle } from "react";
import { Card, TableItem, TableHeadItem, TableHead, TableBody } from "./ui/ui";
import { Edit, Delete } from "./ui/icons";
import React from "react";
import { useSupabaseClient } from "@supabase/auth-helpers-react";

const skillList = ({}, ref) => {
  const supabase = useSupabaseClient()
  const [skills, setSkills] = useState([]);
  const [editingSkill, setEditingSkill] = useState(null);

  useImperativeHandle(ref, () => ({
    getSkills() {
      getSkills();
    },
  }));

  const getSkills = async () => {
    const { data, error } = await supabase
      .from("skills")
      .select()
      .order("date", { ascending: false });
    if (data && !error) {
      setSkills(data);
    }
    setEditingSkill(null);
  };

  useEffect(() => {
    getSkills();
  }, []);

  const onDeleteSkill = async (skill) => {
    const { error } = await supabase
      .from("skills")
      .delete()
      .eq("id", skill.id)
      .select();
    getSkills();
  };
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
          <Delete onClick={() => onDeleteSkill(skill)} />
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
          <SkillForm onSubmit={getSkills} skillItem={editingSkill} />
        </Modal>
      ) : null}
    </>
  );
};

export default React.forwardRef(skillList);
