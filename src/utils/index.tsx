import {
  AdminIcon,
  ModeratorIcon,
  OwnerIcon,
  PremiumIcon,
  UserIcon,
} from "@/components/icons";
import { NotificationEventType, Role, User } from "@/types";
import moment from "moment";
import DOMPurify from "dompurify";

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
    case "OWNER":
      return (
        <span className={`text-owner ${iconSize}`} title="Owner">
          <OwnerIcon />
        </span>
      );
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

// Function to format notification based on type
const formatNotificationMessage = (type: NotificationEventType) => {
  switch (type) {
    case "ROLE_UPDATED":
      return "Has updated your role";
    case "USER_KICKED":
      return "Has kicked you out for breaking rules";
    case "USER_FOLLOWED":
      return "Started following you";
    case "NEW_MESSAGE":
      return "Sent you a message";
    case "NEW_ROOM_CREATED":
      return "Created a new room";
    case "ROOM_DELETED":
      return "Deleted a room";
  }
};

// Function that creates a new notification object
const createNotification = (
  type: NotificationEventType,
  receiverId: string,
  isSystem: boolean = false,
) => {
  return {
    type,
    receiverId,
    isSystem: isSystem ? isSystem : false,
  };
};

const parseUrls = (msg: string) => {
  const urlRegex =
    /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi;

  const urlsArr = msg.split(" ").filter((w) => w.match(urlRegex));

  return msg
    .split(" ")
    .map((word) =>
      !urlsArr.includes(word)
        ? word
        : `<a class="underline" target="_blank" href="${DOMPurify.sanitize(word)}">${DOMPurify.sanitize(word)}</a>`,
    )
    .join(" ");
};

// Check if user is staff
const isStaff = (role: Role) => {
  return role === "OWNER" || role === "ADMIN" || role === "MOD";
};

// Format Roles
const formatRole = (role: Role) => {
  switch (role) {
    case "OWNER":
      return "Owner";
    case "ADMIN":
      return "Admin";
    case "MOD":
      return "Moderator";
    default:
      return "User";
  }
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
  formatNotificationMessage,
  createNotification,
  parseUrls,
  isStaff,
  formatRole,
};
