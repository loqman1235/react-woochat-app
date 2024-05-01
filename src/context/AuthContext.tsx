import api from "@/services/api";
import { getAccessTokenFromLocalStorage } from "@/utils";
import { createContext, useState } from "react";

type AuthContextType = {
  accessToken?: string;
  user?: {
    username: string;
    avatar?: string;
    mood?: string;
    role: "admin" | "mod" | "premium" | "user";
    location?: {
      country?: string;
    };
  };
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
  const [isAuth, setIsAuth] = useState(!!getAccessTokenFromLocalStorage());
  // const [accessToken, setAccessToken] = useState<string | undefined>(
  //   JSON.stringify(getAccessTokenFromLocalStorage()) || undefined,
  // );

  const signinUser = async (credentials: {
    email: string;
    password: string;
  }) => {
    try {
      const res = await api.post<string>("/auth/signin", credentials);

      if (res.status === 200) {
        console.log(res.data);
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
        accessToken: undefined,
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
