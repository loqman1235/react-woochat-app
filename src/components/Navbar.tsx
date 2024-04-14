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

const Navbar = () => {
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);

  const toggleProfileDropdown = () => {
    setIsProfileDropdownOpen((prev) => !prev);
  };

  return (
    <div className="fixed top-0 z-40 h-12 w-full border-b border-b-border bg-foreground px-5 text-text-foreground">
      <div className="container mx-auto flex h-full max-w-full items-center justify-between">
        <div className="flex h-full items-center gap-5">
          <button className="text-2xl">
            <MdMenu />
          </button>
          {/* BRAND */}
          <div className="cursor-pointer select-none text-xl font-extrabold tracking-tight text-text-foreground">
            Woo<span className="text-primary">chat</span>
          </div>
        </div>

        <div className="flex items-center gap-5 text-2xl">
          {/* Theme toggle button here  */}

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
            <div
              className="h-8 w-8 cursor-pointer overflow-hidden rounded-full bg-red-500"
              onClick={toggleProfileDropdown}
            >
              <img
                src="/default_avatar.png"
                alt="avatar"
                className="h-full w-full object-cover"
              />
            </div>

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
