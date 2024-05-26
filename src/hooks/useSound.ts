import { SoundContext } from "@/context/SoundContext";
import { useContext } from "react";

const useSound = () => {
  return useContext(SoundContext);
};

export default useSound;
