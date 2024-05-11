interface ModalProps {
  children: React.ReactNode;
  isOpen: boolean;
  onClose?: () => void;
}

const Modal = ({ children, isOpen, onClose }: ModalProps) => {
  return (
    <div
      className={`fixed left-0 top-0 z-50 flex h-full w-full items-center justify-center bg-black bg-opacity-70 p-2 backdrop-blur-sm md:p-5 ${!isOpen && "hidden"} shadow-2xl`}
      onClick={onClose}
    >
      <div
        className="flex w-full max-w-[420px] flex-col gap-5 rounded-xl bg-foreground p-5"
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
};

export default Modal;
