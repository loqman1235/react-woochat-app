import { z } from "zod";

export type LoginForm = z.infer<typeof loginSchema>;

export type Role = "ADMIN" | "MOD" | "PREMIUM" | "USER";

export type User = {
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
};

export type Room = {
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

export type MessageType = {
  id: string;
  content: string;
  user: User;
  isDeleted?: boolean;
  createdAt: string;
};
