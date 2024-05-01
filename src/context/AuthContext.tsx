import api from "@/services/api";
import { getItemFromLocalStorage, setItemToLocalStorage } from "@/utils";
import { createContext, useState } from "react";

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
  role: "admin" | "mod" | "premium" | "user";
  location?: {
    country?: string;
    city?: string;
    region?: string;
    timezone?: string;
  };
};

type AuthContextType = {
  accessToken?: string;
  user?: User;
  isAuth: boolean;
  setIsAuth: React.Dispatch<React.SetStateAction<boolean>>;
  signinUser: (data: { email: string; password: string }) => Promise<void>;
  signoutUser: () => void;
};

interface AuthContextProviderProps {
  children: React.ReactNode;
}

export const AuthContext = createContext<AuthContextType>({
  accessToken: undefined,
  user: undefined,
  isAuth: false,
  setIsAuth: () => {},
  signinUser: async () => {},
  signoutUser: () => {},
});

export const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
  const [isAuth, setIsAuth] = useState(
    !!getItemFromLocalStorage("accessToken"),
  );

  const [accessToken, setAccessToken] = useState<string | undefined>(
    JSON.stringify(getItemFromLocalStorage("accessToken")) || undefined,
  );

  const [user, setUser] = useState<User | undefined>(
    getItemFromLocalStorage("user")
      ? JSON.parse(getItemFromLocalStorage("user") || "")
      : undefined,
  );

  const signinUser = async (credentials: {
    email: string;
    password: string;
  }) => {
    try {
      const res = await api.post("/auth/signin", credentials);

      if (res.status === 200) {
        const { accessToken, user } = res.data;

        console.log(res.data);
        setItemToLocalStorage("accessToken", accessToken);
        setItemToLocalStorage("user", JSON.stringify(user));
        setAccessToken(accessToken);
        setUser(user);
        setIsAuth(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const signoutUser = () => {
    setIsAuth(false);
  };

  // verify accessToken first

  return (
    <AuthContext.Provider
      value={{
        accessToken,
        user,
        isAuth,
        setIsAuth: () => {},
        signinUser,
        signoutUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
