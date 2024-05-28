import { FaRobot } from "react-icons/fa";

interface BotAvatarProps {
  size: "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "5xl" | "6xl";
}

const BotAvatar = ({ size }: BotAvatarProps) => {
  const botAvatarSize = {
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
    <div
      className={`flex items-center justify-center rounded-full bg-primary text-xl text-white ${botAvatarSize}`}
    >
      <FaRobot />
    </div>
  );
};

export default BotAvatar;
