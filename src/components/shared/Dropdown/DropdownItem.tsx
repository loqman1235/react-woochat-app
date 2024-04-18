interface DropdownItemProps {
  handleClick?: () => void;
  icon?: React.ReactNode;
  text: string;
}

const DropdownItem = ({ text, icon, handleClick }: DropdownItemProps) => {
  return (
    <li
      className="flex cursor-pointer items-center gap-2 rounded-md border-b border-b-border px-3 py-2 capitalize text-text-muted transition duration-300 last:border-0 hover:bg-muted-hover hover:text-text-foreground"
      onClick={handleClick}
    >
      {icon && <span>{icon}</span>}
      <span>{text}</span>
    </li>
  );
};

export default DropdownItem;
