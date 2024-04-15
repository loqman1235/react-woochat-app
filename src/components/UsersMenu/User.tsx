import Flag from "react-world-flags";
import { AdminIcon, ModeratorIcon, PremiumIcon, UserIcon } from "../icons";
import { MdAccountCircle, MdBolt, MdEmail } from "react-icons/md";
import { useState } from "react";
import Avatar from "../shared/Avatar";

interface UserProps {
  username: string;
  avatar: string;
  gender: "male" | "female";
  mood?: string;
  role: "admin" | "mod" | "premium" | "user";
  country?: string;
}

// Manage roles icons
const getRoleIcon = (role: string) => {
  switch (role) {
    case "admin":
      return (
        <span className="text-sm text-admin" title="Admin">
          <AdminIcon />
        </span>
      );
    case "mod":
      return (
        <span className="text-sm text-mod" title="Moderator">
          <ModeratorIcon />
        </span>
      );
    case "premium":
      return (
        <span className="text-sm text-premium" title="Premium">
          <PremiumIcon />
        </span>
      );
    case "user":
      return (
        <span className="text-sm text-user" title="User">
          <UserIcon />
        </span>
      );
    default:
      return (
        <span className="text-sm text-user" title="User">
          <UserIcon />
        </span>
      );
  }
};

const User = ({ username, avatar, gender, mood, role, country }: UserProps) => {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const toggleUserMenu = () => {
    setIsUserMenuOpen((prev) => !prev);
  };

  return (
    <div className="relative overflow-hidden">
      <div
        className="flex cursor-pointer items-center justify-between border-b border-b-border px-5 py-2 last:border-0"
        onClick={toggleUserMenu}
      >
        <div className="flex items-center gap-2">
          {/* AVATAR */}

          <Avatar
            src={avatar}
            username={username}
            gender={gender}
            size="md"
            isBordered
          />
          {/* USERNAME AND MOOD */}
          <ul>
            <li className="text-sm font-bold lowercase text-text-foreground">
              {username}
            </li>
            {mood && <li className="text-[11px] text-text-muted">{mood}</li>}
          </ul>
        </div>
        <div>
          {/* ROLE AND COUNTRY */}
          <div className="flex items-center gap-2">
            {getRoleIcon(role)}
            {country && (
              <span>
                <Flag
                  code={country}
                  fallback="🏳️‍🌈"
                  className="rounded-sm"
                  style={{ width: "20px", height: "15px", borderRadius: "4px" }}
                />
              </span>
            )}
          </div>
        </div>
      </div>

      {/* DROPDOWN ACTIONS */}
      <ul
        className={`max-h-0 w-full bg-muted text-text-muted-2 transition-all duration-500 ease-in-out ${isUserMenuOpen && "max-h-96"}`}
      >
        <li className="cursor-pointer border-b border-b-border px-5 py-2 transition duration-300 hover:bg-muted-hover hover:text-text-foreground">
          <button className="flex items-center gap-2">
            <span>
              <MdEmail />
            </span>
            <span>Private</span>
          </button>
        </li>

        <li className="cursor-pointer border-b border-b-border px-5 py-2 transition duration-300 hover:bg-muted-hover hover:text-text-foreground">
          <button className="flex items-center gap-2">
            <span>
              <MdAccountCircle />
            </span>
            <span>View profile</span>
          </button>
        </li>

        <li className="cursor-pointer px-5 py-2 transition duration-300 hover:bg-muted-hover hover:text-text-foreground">
          <button className="flex items-center gap-2">
            <span>
              <MdBolt />
            </span>
            <span>Action</span>
          </button>
        </li>
      </ul>
    </div>
  );
};

export default User;
