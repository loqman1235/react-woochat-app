import { useTheme } from "@/hooks/useTheme";
import { ClipLoader } from "react-spinners";

const LoadingScreen = () => {
  const { theme } = useTheme();

  const spinnerColor = "#009688";
  const backgroundColor =
    theme === "light" ? "bg-black bg-opacity-70" : "bg-gray-900 bg-opacity-70";
  const textColor = theme === "light" ? "text-white" : "text-gray-200";

  return (
    <div
      className={`fixed z-50 flex h-screen w-full items-center justify-center ${backgroundColor} backdrop-blur-lg`}
    >
      <div className="text-center">
        <span>
          <ClipLoader size={24} color={spinnerColor} />
        </span>
        <p className={`mt-2 ${textColor}`}>Loading...</p>
      </div>
    </div>
  );
};

export default LoadingScreen;
