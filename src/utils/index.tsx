import {
  AdminIcon,
  ModeratorIcon,
  PremiumIcon,
  UserIcon,
} from "@/components/icons";
import { Role, User } from "@/types";
import moment from "moment";

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
    case "ADMIN":
      return (
        <span className={`text-admin ${iconSize}`} title="Admin">
          <AdminIcon />
        </span>
      );
    case "MOD":
      return (
        <span className={`text-mod ${iconSize}`} title="Moderator">
          <ModeratorIcon />
        </span>
      );
    case "PREMIUM":
      return (
        <span className={`text-premium ${iconSize}`} title="Premium">
          <PremiumIcon />
        </span>
      );
    case "USER":
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

// LOCAL STORAGE
const getItemFromLocalStorage = (key: string) => {
  try {
    const item = localStorage.getItem(key);
    return item;
  } catch (error) {
    console.error("Error retrieving item from localStorage:", error);
    return null;
  }
};

const setItemToLocalStorage = (key: string, value: string) => {
  try {
    localStorage.setItem(key, value);
  } catch (error) {
    console.error("Error setting item to localStorage:", error);
  }
};

const removeItemFromLocalStorage = (key: string) => {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error("Error removing item from localStorage:", error);
  }
};

// Log when in development mode
const debugLog = (...messages: unknown[]): void => {
  if (import.meta.env.VITE_MODE === "development") {
    console.log(...messages);
  }

  return;
};

// Format date using moment.js
const formatDate = (date: string) => {
  return moment(date).calendar();
};

const playSound = (audioFile: string) => {
  const audio = new Audio(audioFile);
  audio.play().catch((error) => console.log("Play sound failed:", error));
};

// Filter users by role
const filterUsersByRole = (users: User[], role: Role[], isLoading: boolean) => {
  if (isLoading) {
    return [];
  }

  return users.filter((user) => role.includes(user.role));
};

// Check if user is online or not
const isUserOnline = (onlineUsersArr: User[], userId: string): boolean => {
  const onlineUsersIds = onlineUsersArr.map((user) => user.id);
  return onlineUsersIds.includes(userId);
};

export {
  getRoleIcon,
  getItemFromLocalStorage,
  setItemToLocalStorage,
  removeItemFromLocalStorage,
  debugLog,
  formatDate,
  playSound,
  filterUsersByRole,
  isUserOnline,
};
