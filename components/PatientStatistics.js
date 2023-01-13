import {
  TableItem,
  TableHeadItem,
  TableHead,
  TableBody,
  TableWrapper,
  Table,
} from "./ui/ui";

const PatientStatistics = ({ stats }) => {
  const statsRows = Object.keys(stats).map((dx) => {
    const stat = stats[dx];
    return (
      <tr className="whitespace-nowrap">
        <TableItem>{dx}</TableItem>
        <TableItem>
          {stat.A + stat.B + stat.C} / {stat.min_procedures}
        </TableItem>
        <TableItem>
          {stat.A} / {stat.min_A}
        </TableItem>
        <TableItem>
          {stat.B} / {stat.min_B}
        </TableItem>
        <TableItem>
          {stat.C} / {stat.min_C}
        </TableItem>
      </tr>
    );
  });

  return (
    <TableWrapper>
      <Table>
        <TableHead>
          <tr>
            <th rowSpan="2">Patologija</th>
            <th rowSpan="2">Pacientų sk.</th>
            <th colSpan="3">Sav. lygis</th>
          </tr>
          <tr>
            <TableHeadItem>A</TableHeadItem>
            <TableHeadItem>B</TableHeadItem>
            <TableHeadItem>C</TableHeadItem>
          </tr>
        </TableHead>
        <TableBody>{statsRows}</TableBody>
      </Table>
    </TableWrapper>
  );
};

export default PatientStatistics;
