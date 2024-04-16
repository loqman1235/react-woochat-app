import { useContext } from "react";
import { SidebarToggleContext } from "@/context/SidebarToggleContext";

export const useSidebarToggle = () => {
  return useContext(SidebarToggleContext);
};
