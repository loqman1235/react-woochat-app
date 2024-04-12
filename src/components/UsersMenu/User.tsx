import { MdGavel, MdPerson, MdSecurity, MdEmojiEvents } from "react-icons/md";

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
        <span className="text-admin" title="Admin">
          <MdSecurity />
        </span>
      );
    case "mod":
      return (
        <span className="text-mod" title="Moderator">
          <MdGavel />
        </span>
      );
    case "premium":
      return (
        <span className="text-premium" title="Premium">
          <MdEmojiEvents />
        </span>
      );
    case "user":
      return <MdPerson />;
    default:
      return <MdPerson />;
  }
};

const User = ({ username, avatar, gender, mood, role, country }: UserProps) => {
  const avatarBorder = gender === "male" ? "border-male" : "border-female";

  return (
    <div className="flex items-center justify-between border-b border-b-border px-5 py-2 last:border-0">
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
        <div>
          {getRoleIcon(role)}
          {country && <span>{country}</span>}
        </div>
      </div>
    </div>
  );
};

export default User;
