import Flag from "react-world-flags";
import { MdAccountCircle, MdBolt, MdEmail } from "react-icons/md";
import { useState } from "react";
import Avatar from "../shared/Avatar";
import { getRoleIcon } from "@/utils";
import useChatWindow from "@/hooks/useChatWindow";
import { User as UserType } from "@/types";

const User = ({
  id,
  email,
  username,
  avatar,
  gender,
  mood,
  role,
  location,
}: UserType) => {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const { setCurrentUser, setIsChatWindowOpen } = useChatWindow();

  const toggleUserMenu = () => {
    setIsUserMenuOpen((prev) => !prev);
  };

  const animatedText =
    role === "OWNER" || role === "ADMIN" || role === "MOD" || role === "PREMIUM"
      ? "animated-text"
      : null;

  return (
    <div className="relative overflow-hidden">
      <div
        className="flex cursor-pointer items-center justify-between rounded-lg px-[4px] py-2 transition duration-300 last:border-0 hover:bg-muted-hover md:px-[10px]"
        onClick={toggleUserMenu}
      >
        <div className="flex items-center gap-2">
          {/* AVATAR */}
          <Avatar
            src={avatar ? avatar.secure_url : "/default_avatar.png"}
            username={username}
            gender={gender}
            size="md"
            isBordered
          />
          {/* USERNAME AND MOOD */}
          <ul>
            <li
              className={`truncate text-sm font-bold text-text-foreground ${animatedText}`}
            >
              {username}
            </li>
            {mood && <li className="text-sm text-text-muted">{mood}</li>}
          </ul>
        </div>
        <div>
          {/* ROLE AND COUNTRY */}
          <div className="flex items-center gap-2">
            {getRoleIcon(role)}
            {location && (
              <span>
                <Flag
                  code={location.country}
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
        <li className="cursor-pointer border-b border-b-border px-2 py-2 transition duration-300 hover:bg-muted-hover hover:text-text-foreground md:px-5">
          <button
            className="flex items-center gap-2"
            onClick={() => {
              setIsChatWindowOpen(true);
              setCurrentUser({
                id,
                email,
                username,
                avatar,
                gender,
                mood,
                role,
                location,
              });
            }}
          >
            <span>
              <MdEmail />
            </span>
            <span className="text-text-foreground">Private</span>
          </button>
        </li>

        <li className="cursor-pointer border-b border-b-border px-2 py-2 transition duration-300 hover:bg-muted-hover hover:text-text-foreground md:px-5">
          <button className="flex items-center gap-2">
            <span>
              <MdAccountCircle />
            </span>
            <span className="text-text-foreground">View profile</span>
          </button>
        </li>

        <li className="cursor-pointer px-2 py-2 transition duration-300 hover:bg-muted-hover hover:text-text-foreground md:px-5">
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
