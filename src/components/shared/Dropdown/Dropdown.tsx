import { useTheme } from "@/hooks/useTheme";

interface DropdownProps {
  children: React.ReactNode;
  isOpen: boolean;
  // position?: "left" | "right";
}

const Dropdown = ({ children, isOpen }: DropdownProps) => {
  const { theme } = useTheme();
  return (
    <ul
      className={`absolute right-0 top-full mt-2 min-w-56 origin-top rounded-md bg-foreground px-2 py-2 text-base opacity-0 shadow-2xl transition-all duration-300 ease-in-out before:absolute before:-top-3 before:right-0 before:-z-10 before:mr-1 before:mt-2 before:block before:h-3 before:w-3 before:rotate-45 before:bg-foreground before:content-[""]  ${isOpen && "!visible !translate-y-0 !opacity-100"} invisible translate-y-3 opacity-0 ${theme === "light" ? "bg-foreground after:bg-foreground" : "bg-[#242424] before:bg-[#242424]"}`}
    >
      {children}
    </ul>
  );
};

export default Dropdown;
