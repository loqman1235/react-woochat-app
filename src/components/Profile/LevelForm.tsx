import useProfile from "@/hooks/useProfile";

interface LevelFormProps {
  isOpen: boolean;
}

const LevelForm = ({ isOpen = false }: LevelFormProps) => {
  const { currentUser } = useProfile();
  return (
    <div className={`w-full p-5 ${isOpen ? "block" : "hidden"}`}>
      <p className="text-text-foreground">Level: {currentUser?.level}</p>
    </div>
  );
};

export default LevelForm;
