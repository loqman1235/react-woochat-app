import { useTheme } from "@/hooks/useTheme";

interface DropdownItemProps {
  handleClick?: () => void;
  icon?: React.ReactNode;
  text: string;
  bgColor?: "default" | "danger";
}

const DropdownItem = ({
  text,
  icon,
  bgColor = "default",
  handleClick,
}: DropdownItemProps) => {
  const { theme } = useTheme();

  const bgColorStyles =
    bgColor === "default"
      ? "hover:bg-muted-hover"
      : `${theme === "dark" ? "hover:bg-[#2f0c12]" : "hover:bg-[#f7e7e7]"}`;
  const textColorStyles =
    bgColor === "default"
      ? "text-text-muted hover:text-text-foreground"
      : "text-danger hover:!text-danger";

  return (
    <li
      className={`flex cursor-pointer items-center gap-2 rounded-md border-b border-b-border px-3 py-2 capitalize transition duration-300 last:border-0 ${bgColorStyles} ${textColorStyles}`}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        handleClick && handleClick();
      }}
    >
      {icon && <span>{icon}</span>}
      <span>{text}</span>
    </li>
  );
};

export default DropdownItem;
