import fakePatients from "../config/texts/fakePatients.json";
import { Card, TableItem, TableHeadItem, TableHead, TableBody } from "./ui";
import { Edit } from "./icons";
import { useState } from "react";
import Modal from "./Modal";
import PatientForm from "./PatientForm";

const patientList = () => {
  const [editingPatient, setEditingPatient] = useState(null);

  const rows = fakePatients.map((patient, i) => {
    return (
      <tr key={i}>
        <TableItem>{i + 1}</TableItem>
        <TableItem>{patient.date}</TableItem>
        <TableItem>{patient.patientNum}</TableItem>
        <TableItem>{patient.TLK_code}</TableItem>
        <TableItem>{patient.level}</TableItem>
        <TableItem>
          <Edit onClick={() => setEditingPatient(patient)} />
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
                <TableHeadItem>Pacientas</TableHeadItem>
                <TableHeadItem>TLK diagnozė</TableHeadItem>
                <TableHeadItem>Lygis</TableHeadItem>
                <TableHeadItem></TableHeadItem>
              </tr>
            </TableHead>
            <TableBody>{rows}</TableBody>
          </table>
        </div>
      </Card>

      {editingPatient ? (
        <Modal onModalClose={() => setEditingPatient(null)}>
          <PatientForm patient={editingPatient} />
        </Modal>
      ) : null}
    </>
  );
};

export default patientList;
