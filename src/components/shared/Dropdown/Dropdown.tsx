import { useTheme } from "@/hooks/useTheme";

interface DropdownProps {
  children: React.ReactNode;
  isOpen: boolean;
  position?: "left" | "right";
}

const Dropdown = ({ children, isOpen, position = "right" }: DropdownProps) => {
  const { theme } = useTheme();
  const dropdownPosition = position === "right" ? "right-0" : "left-0";
  return (
    <ul
      className={`absolute top-full  min-w-56 origin-top rounded-md border border-border bg-foreground px-2 py-2 text-base opacity-0 shadow-xl transition-all duration-300 ease-[cubic-bezier(0.87,0,0.13,1)] ${isOpen && "!visible !translate-y-0 !opacity-100"} invisible translate-y-3 opacity-0 ${theme === "light" ? "bg-foreground before:bg-foreground" : "bg-muted"} ${dropdownPosition} z-50`}
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      {children}
    </ul>
  );
};

export default Dropdown;
