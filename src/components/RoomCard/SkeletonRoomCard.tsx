import { useTheme } from "@/hooks/useTheme";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const SkeletonRoomCard = () => {
  const { theme } = useTheme();

  const baseColor = theme === "dark" ? "#252627" : "#E0E0E0";
  const highlightColor = theme === "dark" ? "#2d2e2f" : "#F5F5F5";

  return (
    <div className="flex items-start gap-3 rounded-md bg-foreground p-3 shadow transition duration-300 hover:bg-muted">
      <div className="h-20 w-20 overflow-hidden rounded-md">
        <Skeleton
          height="100%"
          width="100%"
          baseColor={baseColor}
          highlightColor={highlightColor}
          className="rounded-md"
        />
      </div>
      <div className="w-[calc(100%-80px)]">
        <Skeleton
          height={16}
          width={100}
          baseColor={baseColor}
          highlightColor={highlightColor}
        />
        <Skeleton
          height={12}
          width="100%"
          baseColor={baseColor}
          highlightColor={highlightColor}
          count={2}
        />
      </div>
    </div>
  );
};

export default SkeletonRoomCard;
