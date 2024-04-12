interface MainMenuItemProps {
  icon: React.JSX.Element;
  text: string;
}

const MainMenuItem = ({ icon, text }: MainMenuItemProps) => {
  return (
    <li className="w-full border-b border-border px-5 py-2 last:border-0">
      <button className="flex items-center gap-2">
        <span>{icon}</span>
        <span>{text}</span>
      </button>
    </li>
  );
};

export default MainMenuItem;
