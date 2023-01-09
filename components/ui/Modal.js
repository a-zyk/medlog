import { Card } from "./ui";
import { Close } from "./icons";

const Modal = ({ children, onModalClose }) => {
  return (
    <div>
      <div className="bg-slate-500/50 top-0 left-0 fixed w-full h-full -z-1"></div>
      <div className="flex justify-center h-full w-screen fixed z-10 top-0 left-0  items-center">
        <Card className="relative">
          <Close onClick={onModalClose} />
          {children}
        </Card>
      </div>
    </div>
  );
};

export default Modal;
