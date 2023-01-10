import { Card } from "../components/ui/ui";

import { useRef } from "react";
import SeminarForm from "../components/SeminarForm";
import SeminarList from "../components/SeminarList";

export default function Seminars() {
  const ListRef = useRef();
  const refreshList = () => {
    ListRef.current.getSeminars();
  };

  return (
    <>
      <div>
        <Card>
          <SeminarForm onSubmit={refreshList} seminarItem={{}} />
        </Card>
        <div className="w-full mt-4">
          <SeminarList ref={ListRef} />
        </div>
      </div>
    </>
  );
}
