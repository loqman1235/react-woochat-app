import Flag from "react-world-flags";
import { MdAccountCircle, MdBolt, MdEmail } from "react-icons/md";
import { useState } from "react";
import Avatar from "../shared/Avatar";
import { getRoleIcon } from "@/utils";
import useChatWindow from "@/hooks/useChatWindow";

export interface UserProps {
  id?: string;
  username: string;
  avatar: string;
  gender: "male" | "female";
  mood?: string;
  role: "admin" | "mod" | "premium" | "user";
  country?: string;
}

const User = ({ username, avatar, gender, mood, role, country }: UserProps) => {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const { setCurrentUser, setIsChatWindowOpen } = useChatWindow();

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
            <li className="text-sm font-bold text-text-foreground">
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
          <button
            className="flex items-center gap-2"
            onClick={() => {
              setIsChatWindowOpen(true);
              setCurrentUser({
                username,
                avatar,
                gender,
                mood,
                role,
                country,
              });
            }}
          >
            <span>
              <MdEmail />
            </span>
            <span className="text-text-foreground">Private</span>
          </button>
        </li>

        <li className="cursor-pointer border-b border-b-border px-5 py-2 transition duration-300 hover:bg-muted-hover hover:text-text-foreground">
          <button className="flex items-center gap-2">
            <span>
              <MdAccountCircle />
            </span>
            <span className="text-text-foreground">View profile</span>
          </button>
        </li>

        <li className="cursor-pointer px-5 py-2 transition duration-300 hover:bg-muted-hover hover:text-text-foreground">
          <button className="flex items-center gap-2">
            <span>
              <MdBolt />
            </span>
            <span className="text-text-foreground">Action</span>
          </button>
        </li>
      </ul>
    </div>
  );
};

export default User;
