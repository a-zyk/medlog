import SkillForm from "../components/SkillForm";
import SkillList from "../components/SkillList";
import { Card } from "../components/ui";

export default function Skills() {
  return (
    <>
      <div className="container">
        <Card>
          <SkillForm skillItem={{}} />
        </Card>
        <SkillList />
      </div>
    </>
  );
}
