import { MdClose } from "react-icons/md";

interface ModalProps {
  children: React.ReactNode;
  onClose?: () => void;
  isOpen?: boolean;
}

const Modal = ({ children, isOpen = false }: ModalProps) => {
  return (
    // MODAL CONTAINER
    <div
      className={`fixed inset-0 z-50 flex h-screen w-full items-center justify-center bg-black/50 backdrop-blur-sm ${isOpen ? "block" : "hidden"}`}
    >
      <div className="w-[90%] max-w-[480px] rounded-lg bg-foreground shadow-lg">
        {/* MODAL HEADER */}
        <div className="flex items-center justify-end p-5 text-text-foreground">
          <button className="text-2xl text-text-muted transition duration-300 hover:text-text-foreground">
            <MdClose />
          </button>
        </div>
        {/* MODAL BODY */}
        <div className="p-5">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
