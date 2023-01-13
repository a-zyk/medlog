import {
  TableItem,
  TableHeadItem,
  TableHead,
  TableBody,
  TableWrapper,
  Table,
} from "./ui/ui";

const SkillsStatistics = ({ stats }) => {
  const statsRows = Object.keys(stats).map((skill) => {
    const stat = stats[skill];
    
    return (
      <tr className="whitespace-nowrap" key={skill}>
        <TableItem>{skill}</TableItem>
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
            <th rowSpan="3">Įgudis</th>
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

export default SkillsStatistics;
