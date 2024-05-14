import { useTheme } from "@/hooks/useTheme";
import Skeleton from "react-loading-skeleton";

const MessageSkeleton = () => {
  const { theme } = useTheme();

  const baseColor = theme === "dark" ? "#252627" : "#E0E0E0";
  const highlightColor = theme === "dark" ? "#2d2e2f" : "#F5F5F5";

  return (
    <div className="flex w-full items-start gap-2 px-2 py-2 md:px-5">
      {/* Avatar */}
      <div className="relative">
        <Skeleton
          circle={true}
          height={40}
          width={40}
          baseColor={baseColor}
          highlightColor={highlightColor}
          className="rounded-md"
        />
      </div>

      <div className="flex-[1]">
        {/* HEADER */}
        <div className="mb-2 flex items-center gap-2">
          <Skeleton
            height="12px"
            width="80px"
            baseColor={baseColor}
            highlightColor={highlightColor}
            className="rounded-md"
          />
        </div>
        {/* MESSAGE */}
        <div className="w-1/2 rounded-2xl rounded-tl-none bg-foreground p-4 shadow-sm">
          <Skeleton
            height="12px"
            width="100%"
            baseColor={baseColor}
            highlightColor={highlightColor}
            className="rounded-md"
          />
        </div>
      </div>
    </div>
  );
};

export default MessageSkeleton;
