import SkillForm from "../components/SkillForm";
import SkillList from "../components/SkillList";
import { Card } from "../components/ui/ui";

import { useRef } from "react";

export default function Skills() {
  const ListRef = useRef();

  const refreshList = () => {
    ListRef.current.getSkills();
  };

  return (
    <>
      <div className="container">
        <Card>
          <SkillForm onSubmit={refreshList} skillItem={{}} />
        </Card>
        <SkillList ref={ListRef} />
      </div>
    </>
  );
}
