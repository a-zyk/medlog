import fakeSeminars from '../config/texts/fakeSeminars.json'
import Modal from "./ui/Modal";
import { useState } from "react";
import { Card, TableItem, TableHeadItem, TableHead, TableBody } from "./ui/ui";
import { Edit, Delete } from "./ui/icons";
import SeminarForm from './SeminarForm'

const seminarList = () => {
  const [editingSeminar, setEditingSeminar] = useState(null);
  
  const rows = fakeSeminars.map((seminar, i) => {
    return (
      <tr key={i}>
        <TableItem>{i + 1}</TableItem>
        <TableItem>{seminar.date}</TableItem>
        <TableItem>{seminar.seminar}</TableItem>
        <TableItem>{seminar.abc}</TableItem>
        <TableItem className="flex gap-4">
          <Edit onClick={() => setEditingSeminar(seminar)} />
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
          <SeminarForm  seminarItem={editingSeminar} />
        </Modal>
      ) : null}
    </>
  );
};

export default seminarList;
