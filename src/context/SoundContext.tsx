import { createContext, useState } from "react";

type SoundContextType = {
  isPlaying: boolean;
  setIsPlaying: React.Dispatch<React.SetStateAction<boolean>>;
};

interface SoundProviderProps {
  children: React.ReactNode;
}

const SoundContext = createContext<SoundContextType>({
  isPlaying: false,
  setIsPlaying: () => {},
});

const SoundProvider = ({ children }: SoundProviderProps) => {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <SoundContext.Provider value={{ isPlaying, setIsPlaying }}>
      {children}
    </SoundContext.Provider>
  );
};

export { SoundProvider, SoundContext };
