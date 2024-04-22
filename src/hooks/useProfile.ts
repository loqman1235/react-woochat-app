import { ProfileContext } from "@/context/ProfileContext";
import { useContext } from "react";

const useProfile = () => {
  return useContext(ProfileContext);
};

export default useProfile;
