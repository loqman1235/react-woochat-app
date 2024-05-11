interface LevelFormProps {
  isOpen: boolean;
}

const LevelForm = ({ isOpen = false }: LevelFormProps) => {
  return (
    <div className={`w-full p-5 ${isOpen ? "block" : "hidden"}`}>
      Level Section
    </div>
  );
};

export default LevelForm;
