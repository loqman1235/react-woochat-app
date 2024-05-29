import { createContext, useState } from "react";

type SoundContextType = {
  isPlaying: boolean;
  setIsPlaying: React.Dispatch<React.SetStateAction<boolean>>;
  toggleSound: () => void;
};

interface SoundProviderProps {
  children: React.ReactNode;
}

const SoundContext = createContext<SoundContextType>({
  isPlaying: false,
  setIsPlaying: () => {},
  toggleSound: () => {},
});

const SoundProvider = ({ children }: SoundProviderProps) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const toggleSound = () => {
    setIsPlaying((prev) => !prev);
  };

  return (
    <SoundContext.Provider value={{ isPlaying, setIsPlaying, toggleSound }}>
      {children}
    </SoundContext.Provider>
  );
};

export { SoundProvider, SoundContext };
