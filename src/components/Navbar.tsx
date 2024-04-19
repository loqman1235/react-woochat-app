import { useState } from "react";

// ICONS
import {
  MdMenu,
  MdEmail,
  MdPerson2,
  MdNotifications,
  MdAccountCircle,
  MdLogout,
} from "react-icons/md";

import NotifCounter from "./shared/NotifCounter";
import { Dropdown, DropdownItem } from "./shared/Dropdown";
import ThemToggleSwitch from "./shared/ThemToggleSwitch";
import Avatar from "./shared/Avatar";
import { useSidebarToggle } from "@/hooks/useSidebarToggle";
import Brand from "./shared/Brand";

const Navbar = () => {
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const { toggleMainMenu } = useSidebarToggle();

  const toggleProfileDropdown = () => {
    setIsProfileDropdownOpen((prev) => !prev);
  };

  return (
    <div className="fixed top-0 z-40 h-12 w-full border-b border-b-border bg-foreground px-2 text-text-foreground md:px-5">
      <div className="container mx-auto flex h-full max-w-full items-center justify-between">
        <div className="flex h-full items-center gap-2 md:gap-5">
          <button
            className="text-2xl"
            onClick={() => {
              toggleMainMenu();
            }}
          >
            <MdMenu />
          </button>

          {/* BRAND */}
          <Brand />
        </div>

        <div className="flex items-center gap-2 text-2xl md:gap-5">
          <ThemToggleSwitch />

          <button className="relative">
            <MdEmail />
            <NotifCounter count={1} />
          </button>
          <button className="relative">
            <MdPerson2 />
            <NotifCounter count={1} />
          </button>
          <button className="relative">
            <MdNotifications />
            <NotifCounter count={1} />
          </button>
          <div className="relative">
            {/* <div
              className="h-8 w-8 cursor-pointer overflow-hidden rounded-full"
              onClick={toggleProfileDropdown}
            >
              <img
                src="/default_avatar.png"
                alt="avatar"
                className="h-full w-full object-cover"
              />
            </div> */}

            <Avatar
              src="/default_avatar.png"
              gender="male"
              onClick={toggleProfileDropdown}
              size="sm"
            />

            <Dropdown isOpen={isProfileDropdownOpen}>
              <DropdownItem text="profile" icon={<MdAccountCircle />} />
              <DropdownItem text="logout" icon={<MdLogout />} />
            </Dropdown>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
