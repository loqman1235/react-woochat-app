import { z } from "zod";

type LoginForm = z.infer<typeof loginSchema>;

type Role = "ADMIN" | "MOD" | "PREMIUM" | "USER" | "OWNER";

type User = {
  id: string;
  username: string;
  email: string;
  age?: number;
  gender: "male" | "female";
  about?: string;
  level?: number;
  verified?: boolean;
  mood?: string;
  role: Role;
  location?: {
    country?: string;
    city?: string;
    region?: string;
    timezone?: string;
  };
  avatar?: {
    secure_url?: string;
  };
  cover?: {
    secure_url?: string;
  };
  createdAt?: string;
  isGlobalOnline?: boolean;
};

type Room = {
  totalMembers: number;
  id: string;
  name: string;
  description?: string;
  roomImage?: {
    id: string;
    secure_url?: string;
  };
  isPrivate: boolean;
  isPinned: boolean;
};

type MessageType = {
  id: string;
  content: string;
  user: User;
  isDeleted?: boolean;
  createdAt: string;
};

type NotificationEventType =
  | "ROLE_UPDATED"
  | "USER_FOLLOWED"
  | "NEW_MESSAGE"
  | "NEW_ROOM_CREATED"
  | "ROOM_DELETED";

type NotificationType = {
  id: string;
  type: NotificationEventType;
  isRead: boolean;
  isDeleted: boolean;
  isSystem: boolean;
  sender: User;
  createdAt: string;
};

export {
  LoginForm,
  Role,
  User,
  Room,
  MessageType,
  NotificationType,
  NotificationEventType,
  NotificationEventType,
};
