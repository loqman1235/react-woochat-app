import { MdClose } from "react-icons/md";

interface ModalProps {
  children: React.ReactNode;
  isOpen: boolean;
  onClose?: () => void;
  title?: string;
}

const Modal = ({ title, children, isOpen, onClose }: ModalProps) => {
  return (
    <div
      className={`fixed left-0 top-0 z-50 flex h-full w-full items-center justify-center bg-black bg-opacity-70 p-2 backdrop-blur-sm md:p-5 ${!isOpen && "hidden"} shadow-2xl`}
      onClick={onClose}
    >
      <div
        className="flex w-full max-w-[520px] flex-col gap-5 rounded-xl bg-foreground p-5"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-b-border pb-5">
          {title && (
            <h3 className="text-xl font-semibold text-text-foreground">
              {title}
            </h3>
          )}
          <button
            className="ml-auto rounded-full bg-muted p-1 text-2xl text-text-muted transition duration-300 hover:bg-muted-hover hover:text-text-foreground"
            onClick={onClose}
          >
            <MdClose />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};

export default Modal;
