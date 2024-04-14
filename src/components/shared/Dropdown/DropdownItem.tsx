interface DropdownItemProps {
  onClick?: () => void;
  icon?: React.ReactNode;
  text: string;
}

const DropdownItem = ({ text, icon }: DropdownItemProps) => {
  return (
    <li className="hover:bg-muted-hover flex cursor-pointer items-center gap-2 rounded-md border-b border-b-border px-3 py-2 capitalize text-text-muted transition duration-300 last:border-0 hover:text-text-foreground">
      {icon && <span>{icon}</span>}
      <span>{text}</span>
    </li>
  );
};

export default DropdownItem;
