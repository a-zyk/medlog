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
import { useState, useEffect, useImperativeHandle } from "react";
import Modal from "./ui/Modal";
import React from "react";
import PatientForm from "./PatientForm";
import { useSupabaseClient } from "@supabase/auth-helpers-react";

const patientList = ({}, ref) => {
  const supabase = useSupabaseClient();
  const [patients, setPatients] = useState([]);
  const [editingPatient, setEditingPatient] = useState(null);

  useImperativeHandle(ref, () => ({
    getPatients() {
      getPatients();
    },
  }));

  const getPatients = async () => {
    const { data, error } = await supabase
      .from("patients")
      .select()
      .order("date", { ascending: false });

    if (data && !error) {
      setPatients(data);
    }
    setEditingPatient(null);
  };

  useEffect(() => {
    getPatients();
  }, []);

  const onDeletePatient = async (patient) => {
    const { error } = await supabase
      .from("patients")
      .delete()
      .eq("id", patient.id)
      .select();
    getPatients();
  };

  const rows = patients.map((patient, i) => {
    return (
      <tr key={i}>
        <TableItem>{patient.id}</TableItem>
        <TableItem>{patient.date}</TableItem>
        <TableItem>{patient.patient_num}</TableItem>
        <TableItem>{patient.tlkCode}</TableItem>
        <TableItem>{patient.abc}</TableItem>
        <TableItem className="flex gap-4">
          <Edit onClick={() => setEditingPatient(patient)} />
          <Delete
            onClick={() =>
              confirm("Ar tikrai norite ištrinti pacientą?")
                ? onDeletePatient(patient)
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
                <TableHeadItem>Pacientas</TableHeadItem>
                <TableHeadItem>TLK diagnozė</TableHeadItem>
                <TableHeadItem>Lygis</TableHeadItem>
                <TableHeadItem></TableHeadItem>
              </tr>
            </TableHead>
            <TableBody>{rows}</TableBody>
          </Table>
        </TableWrapper>
      </Card>

      {editingPatient ? (
        <Modal onModalClose={() => setEditingPatient(null)}>
          <PatientForm onSubmit={getPatients} patient={editingPatient} />
        </Modal>
      ) : null}
    </>
  );
};

export default React.forwardRef(patientList);
