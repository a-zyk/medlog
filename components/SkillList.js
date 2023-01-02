import fakeSkills from "../config/texts/fakeSkills.json";
import {
  Card,
  TableItem,
  TableHeadItem,
  TableHead,
  TableBody,
 
} from "./ui";

import { Edit } from "./icons";

const skillList = () => {
  const rows = fakeSkills.map((skill, i) => {
    return (
      <tr key={i}>
        <TableItem>{i + 1}</TableItem>
        <TableItem>{skill.date}</TableItem>
        <TableItem>{skill.departament}</TableItem>
        <TableItem>{skill.patientNum}</TableItem>
        <TableItem>{skill.skill}</TableItem>
        <TableItem>{skill.level}</TableItem>
        <TableItem>
          <Edit />
        </TableItem>
      </tr>
    );
  });

  return (
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
  );
};

export default skillList;
