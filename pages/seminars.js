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
      <div className="container">
        <Card>
          <SeminarForm onSubmit={refreshList} seminarItem={{}} />
        </Card>
        <SeminarList ref={ListRef} />
      </div>
    </>
  );
}
