interface OptionsFormProps {
  isOpen: boolean;
}

const OptionsForm = ({ isOpen = false }: OptionsFormProps) => {
  return (
    <div className={`w-full p-5 ${isOpen ? "block" : "hidden"}`}>
      Options Section
    </div>
  );
};

export default OptionsForm;
