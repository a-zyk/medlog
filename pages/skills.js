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
      <div>
        <Card>
          <SkillForm onSubmit={refreshList} skillItem={{}} />
        </Card>
        <div className="w-full mt-4">
          <SkillList ref={ListRef} />
        </div>
      </div>
    </>
  );
}
