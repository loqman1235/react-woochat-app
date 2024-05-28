import { useTheme } from "@/hooks/useTheme";
import { MdClose } from "react-icons/md";

interface ModalProps {
  children: React.ReactNode;
  isOpen: boolean;
  onClose?: () => void;
  title?: string;
}

const Modal = ({ title, children, isOpen, onClose }: ModalProps) => {
  const { theme } = useTheme();
  return (
    <div
      className={`fixed left-0 top-0 z-50 flex h-full w-full items-center justify-center bg-opacity-70 p-2 backdrop-blur-sm md:p-5 ${!isOpen && "hidden"} shadow-2xl ${theme === "light" ? "bg-black/50" : "bg-neutral-400/80"}`}
      onClick={onClose}
    >
      <div
        className="flex w-full max-w-[520px] flex-col gap-5 rounded-xl bg-foreground p-5"
        onClick={(e) => e.stopPropagation()}
      >
        {title && (
          <div className="flex items-center justify-between border-b border-b-border pb-5">
            <h3 className="text-xl font-bold text-text-foreground">{title}</h3>
            <button
              className="ml-auto rounded-full bg-muted p-1 text-2xl text-text-muted transition duration-300 hover:bg-muted-hover hover:text-text-foreground"
              onClick={onClose}
            >
              <MdClose />
            </button>
          </div>
        )}
        {children}
      </div>
    </div>
  );
};

export default Modal;
