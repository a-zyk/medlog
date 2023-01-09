import fakeSeminars from "../config/texts/fakeSeminars.json";
import Modal from "./ui/Modal";
import { useEffect, useState, useImperativeHandle } from "react";
import { Card, TableItem, TableHeadItem, TableHead, TableBody } from "./ui/ui";
import { Edit, Delete } from "./ui/icons";
import SeminarForm from "./SeminarForm";
import React from "react";
import supabase from "../config/SupaBaseClient";

const SeminarList = ({}, ref) => {
  useImperativeHandle(ref, () => ({
    getSeminars() {
      getSeminars();
    },
  }));
  const [seminars, setSeminars] = useState([]);
  const [editingSeminar, setEditingSeminar] = useState(null);
  const getSeminars = async () => {
    const { data, error } = await supabase
      .from("seminars")
      .select()
      .order("date", { ascending: false });
    if (data && !error) {
      setSeminars(data);
    }
    setEditingSeminar(null);
  };

  useEffect(() => {
    getSeminars();
  }, []);

  const onDeleteSeminar = async (seminar) => {
    const { error } = await supabase
      .from("seminars")
      .delete()
      .eq("id", seminar.id)
      .select();
    getSeminars();
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
          <Delete onClick={() => onDeleteSeminar(seminar)} />
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
                <TableHeadItem>Seminaras</TableHeadItem>
                <TableHeadItem>Lygis</TableHeadItem>
                <TableHeadItem></TableHeadItem>
              </tr>
            </TableHead>
            <TableBody>{rows}</TableBody>
          </table>
        </div>
      </Card>
      {editingSeminar ? (
        <Modal onModalClose={() => setEditingSeminar(null)}>
          <SeminarForm onSubmit={getSeminars} seminarItem={editingSeminar} />
        </Modal>
      ) : null}
    </>
  );
};

export default React.forwardRef(SeminarList);
