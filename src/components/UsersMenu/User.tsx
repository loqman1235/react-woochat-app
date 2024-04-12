import { MdGavel, MdPerson, MdSecurity, MdEmojiEvents } from "react-icons/md";
import Flag from "react-world-flags";

interface UserProps {
  username: string;
  avatar: string;
  gender: "male" | "female";
  mood?: string;
  role: string;
  country?: string;
}

// Manage roles icons
const getRoleIcon = (role: string) => {
  switch (role) {
    case "admin":
      return (
        <span className="text-sm text-admin" title="Admin">
          <MdSecurity />
        </span>
      );
    case "mod":
      return (
        <span className="text-sm text-mod" title="Moderator">
          <MdGavel />
        </span>
      );
    case "premium":
      return (
        <span className="text-sm text-premium" title="Premium">
          <MdEmojiEvents />
        </span>
      );
    case "user":
      return (
        <span className="text-sm text-user" title="User">
          <MdPerson />
        </span>
      );
    default:
      return (
        <span className="text-sm text-user" title="User">
          <MdPerson />
        </span>
      );
  }
};

const User = ({ username, avatar, gender, mood, role, country }: UserProps) => {
  const avatarBorder = gender === "male" ? "border-male" : "border-female";

  return (
    <div className="flex cursor-pointer items-center justify-between border-b border-b-border px-5 py-2 last:border-0">
      <div className="flex items-center gap-2">
        {/* AVATAR */}
        <div
          className={`h-10 w-10 overflow-hidden rounded-full border-2 bg-slate-400 ${avatarBorder}`}
        >
          <img
            src={avatar}
            alt={username}
            className="h-full w-full object-cover"
          />
        </div>
        {/* USERNAME AND MOOD */}
        <ul>
          <li className="font-bold lowercase">{username}</li>
          {mood && <li className="text-sm text-text-muted">{mood}</li>}
        </ul>
      </div>
      <div>
        {/* ROLE AND COUNTRY */}
        <div className="flex items-center gap-2">
          {getRoleIcon(role)}
          {country && (
            <span className="w-5">
              <Flag code={country} fallback="🏳️‍🌈" className="rounded-sm" />
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default User;
