import {
  Card,
  TableItem,
  TableHeadItem,
  TableHead,
  TableBody,
  TableWrapper,
  Table,
} from "./ui/ui";
import { Edit, Delete } from "./ui/icons";
import React from "react";
import { useSupabaseClient } from "@supabase/auth-helpers-react";

const skillList = ({ skills, setEditingSkill, refresh }) => {
  const supabase = useSupabaseClient();

  const onDeleteSkill = async (skill) => {
    const { error } = await supabase
      .from("skills")
      .delete()
      .eq("id", skill.id)
      .select();
    refresh();
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
          <Delete
            onClick={() =>
              confirm("Ar tikrai norite ištrinti įgudį?")
                ? onDeleteSkill(skill)
                : null
            }
          />
        </TableItem>
      </tr>
    );
  });

  return (
    <>
      <Card>
        <TableWrapper>
          <Table>
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
          </Table>
        </TableWrapper>
      </Card>
    </>
  );
};

export default skillList;
