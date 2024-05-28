interface AvatarProps {
  src?: string;
  username?: string;
  gender: "male" | "female";
  isBordered?: boolean;
  size: "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "5xl" | "6xl";
  onClick?: () => void;
  rounded?: boolean;
  isOnline?: boolean;
}

const Avatar = ({
  src,
  username,
  isOnline,
  gender,
  isBordered = false,
  size,
  onClick,
  rounded = true,
}: AvatarProps) => {
  const avatarBorder = gender === "male" ? "border-male" : "border-female";
  const avatarSize = {
    sm: "h-8 w-8",
    md: "h-10 w-10",
    lg: "h-12 w-12",
    xl: "h-16 w-16",
    "2xl": "h-20 w-20",
    "3xl": "h-24 w-24",
    "4xl": "h-32 w-32",
    "5xl": "h-40 w-40",
    "6xl": "h-48 w-48",
  }[size];

  return (
    <div className={`relative ${avatarSize}`}>
      <div
        className={`relative cursor-pointer overflow-hidden bg-slate-400 ${isBordered && `border-2 ${avatarBorder}`} h-full w-full ${rounded ? "rounded-full" : "rounded-2xl"}`}
        onClick={onClick}
      >
        <img
          src={src || "/default_avatar.png"}
          alt={username || "Avatar"}
          className="h-full w-full object-cover"
        />
      </div>

      {/* Online Status */}
      {isOnline && (
        <span
          className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-background bg-success"
          title="Online"
        ></span>
      )}
    </div>
  );
};

export default Avatar;
