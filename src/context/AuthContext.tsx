import useSocket from "@/hooks/useSocket";
import api from "@/services/api";
import { User } from "@/types";
import {
  debugLog,
  getItemFromLocalStorage,
  removeItemFromLocalStorage,
  setItemToLocalStorage,
} from "@/utils";
import { AxiosError } from "axios";
import { createContext, useEffect, useState } from "react";

type AuthContextType = {
  accessToken?: string;
  user?: User;
  setUser: React.Dispatch<React.SetStateAction<User | undefined>>;
  isAuth: boolean;
  setIsAuth: React.Dispatch<React.SetStateAction<boolean>>;
  signinUser: (data: { email: string; password: string }) => Promise<void>;
  signoutUser: () => Promise<void>;
  error?: string | undefined;
};

interface AuthContextProviderProps {
  children: React.ReactNode;
}

export const AuthContext = createContext<AuthContextType>({
  accessToken: undefined,
  user: undefined,
  setUser: () => {},
  isAuth: false,
  setIsAuth: () => {},
  signinUser: async () => {},
  signoutUser: async () => {},
  error: undefined,
});

export const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
  const socket = useSocket();
  const [isAuth, setIsAuth] = useState(
    !!getItemFromLocalStorage("accessToken"),
  );

  const [accessToken, setAccessToken] = useState<string | undefined>(
    getItemFromLocalStorage("accessToken") || undefined,
  );

  const [user, setUser] = useState<User | undefined>(
    getItemFromLocalStorage("user")
      ? JSON.parse(getItemFromLocalStorage("user") || "")
      : undefined,
  );

  const [error, setError] = useState<string | undefined>(undefined);

  const signinUser = async (credentials: {
    email: string;
    password: string;
  }) => {
    try {
      const res = await api.post("/auth/signin", credentials);

      if (res.status === 200) {
        const { accessToken, user } = res.data;

        debugLog(res.data);
        setItemToLocalStorage("accessToken", accessToken);
        setItemToLocalStorage("user", JSON.stringify(user));
        setAccessToken(accessToken);
        setUser(user);
        setIsAuth(true);
      }
    } catch (error) {
      if (import.meta.env.MODE === "development") {
        debugLog(error, "SIGN IN ERROR");
      }

      if (error instanceof AxiosError) {
        setError(error.response?.data?.message);
      }
      debugLog(error);
    }
  };

  const signoutUser = async () => {
    try {
      await api.post("/auth/signout");

      socket?.emit("disconnect_user", { user });
      removeItemFromLocalStorage("accessToken");
      removeItemFromLocalStorage("user");
      setAccessToken(undefined);
      setUser(undefined);
      setIsAuth(false);
      setError(undefined);
    } catch (error) {
      if (error instanceof AxiosError) {
        setError(error.response?.data?.message);
      }
      debugLog(error);
    }
  };

  // verify accessToken first
  useEffect(() => {
    const verifyAccessToken = async () => {
      try {
        const response = await api.get("/auth/verify-token", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        if (response.status === 200 && response.data.isValid) {
          setIsAuth(true);
        }
      } catch (error) {
        debugLog(error);
        signoutUser();
      }
    };

    if (accessToken) verifyAccessToken();

    // if (!accessToken) signoutUser();
  }, [accessToken]);

  return (
    <AuthContext.Provider
      value={{
        accessToken,
        user,
        setUser,
        isAuth,
        setIsAuth: () => {},
        signinUser,
        signoutUser,
        error,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
