import {
  AdminIcon,
  ModeratorIcon,
  PremiumIcon,
  UserIcon,
} from "@/components/icons";

// Manage roles icons
const getRoleIcon = (role: string, size: "xs" | "sm" | "md" | "lg" = "sm") => {
  const iconSize =
    size === "xs"
      ? "text-xs"
      : size === "sm"
        ? "text-sm"
        : size === "md"
          ? "text-base"
          : "text-lg";
  switch (role) {
    case "admin":
      return (
        <span className={`text-admin ${iconSize}`} title="Admin">
          <AdminIcon />
        </span>
      );
    case "mod":
      return (
        <span className={`text-mod ${iconSize}`} title="Moderator">
          <ModeratorIcon />
        </span>
      );
    case "premium":
      return (
        <span className={`text-premium ${iconSize}`} title="Premium">
          <PremiumIcon />
        </span>
      );
    case "user":
      return (
        <span className={`text-user ${iconSize}`} title="User">
          <UserIcon />
        </span>
      );
    default:
      return (
        <span className={`text-user ${iconSize}`} title="User">
          <UserIcon />
        </span>
      );
  }
};

const getAccessTokenFromLocalStorage = (): string | null => {
  const accessToken = localStorage.getItem("accessToken");
  return accessToken;
};

export { getRoleIcon, getAccessTokenFromLocalStorage };
