interface AvatarProps {
  src: string;
  username?: string;
  gender: "male" | "female";
  isBordered?: boolean;
  size: "sm" | "md" | "lg";
  onClick?: () => void;
}

const Avatar = ({
  src,
  username,
  gender,
  isBordered = false,
  size,
  onClick,
}: AvatarProps) => {
  const avatarBorder = gender === "male" ? "border-male" : "border-female";
  const avatarSize =
    size === "sm" ? "h-8 w-8" : size === "md" ? "h-10 w-10" : "h-12 w-12";

  return (
    <div className={`relative ${avatarSize}`}>
      <div
        className={`relative cursor-pointer overflow-hidden rounded-full bg-slate-400 ${isBordered && `border-2 ${avatarBorder}`} h-full w-full`}
        onClick={onClick}
      >
        <img
          src={src}
          alt={username || "Avatar"}
          className="h-full w-full object-cover"
        />
      </div>

      {/* LEVEL  */}
    </div>
  );
};

export default Avatar;
