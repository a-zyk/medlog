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

const SeminarList = ({ seminars, setEditingSeminar, refresh }) => {
  const supabase = useSupabaseClient();

  const onDeleteSeminar = async (seminar) => {
    const { error } = await supabase
      .from("seminars")
      .delete()
      .eq("id", seminar.id)
      .select();
    refresh();
  };
  const rows = seminars.map((seminar, i) => {
    return (
      <tr key={i}>
        <TableItem>{i + 1}</TableItem>
        <TableItem>{seminar.date}</TableItem>
        <TableItem>{seminar.seminar}</TableItem>
        <TableItem>{seminar.abc}</TableItem>
        <TableItem className="flex gap-4">
          <Edit onClick={() => setEditingSeminar(seminar)} />
          <Delete
            onClick={() =>
              confirm("Ar tikrai norite ištrinti seminarą?")
                ? onDeleteSeminar(seminar)
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
                <TableHeadItem>Seminaras</TableHeadItem>
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

export default SeminarList;
