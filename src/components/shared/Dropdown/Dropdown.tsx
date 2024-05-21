import { useTheme } from "@/hooks/useTheme";
import { useEffect, useRef } from "react";

interface DropdownProps {
  children: React.ReactNode;
  isOpen: boolean;
  position?: "left" | "right";
}

const Dropdown = ({ children, isOpen, position = "right" }: DropdownProps) => {
  const { theme } = useTheme();
  const dropDownRef = useRef<HTMLUListElement>(null);
  const dropdownPosition = position === "right" ? "right-0" : "left-0";

  // Close dropdown when clicked outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropDownRef.current &&
        !dropDownRef.current.contains(e.target as Node)
      ) {
        if (e.target instanceof HTMLElement && e.target.id === "dropdown")
          return;
        dropDownRef.current.classList.add(
          "!opacity-0",
          "!invisible",
          "!translate-y-3",
        );
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropDownRef]);

  return (
    <ul
      id="dropdown"
      ref={dropDownRef}
      className={`absolute top-full mt-2 min-w-56 origin-top rounded-md border border-border bg-foreground px-2 py-2 text-base opacity-0 shadow-xl transition-all duration-300 ease-[cubic-bezier(0.87,0,0.13,1)] ${isOpen && "!visible !translate-y-0 !opacity-100"} invisible max-h-48 translate-y-3 overflow-y-auto opacity-0 ${theme === "light" ? "bg-foreground before:bg-foreground" : "bg-muted"} ${dropdownPosition} z-50`}
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      {children}
    </ul>
  );
};

export default Dropdown;
