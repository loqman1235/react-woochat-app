import { MdImage, MdPeople, MdPushPin } from "react-icons/md";
import { Link } from "react-router-dom";

interface RoomCardProps {
  name: string;
  image?: string;
  totalMembers: number;
  description?: string;
  isPinned?: boolean;
}

const RoomCard = ({
  name,
  image,
  totalMembers,
  description,
  isPinned = false,
}: RoomCardProps) => {
  return (
    <Link
      to="/chat"
      className="flex items-center gap-3 rounded-md bg-foreground p-3 shadow transition duration-300 hover:bg-muted"
    >
      {/* ROOM IMAGE */}
      {image ? (
        <div className="h-20 w-20 overflow-hidden rounded-md">
          <img src={image} alt={name} className="h-full w-full object-cover" />
        </div>
      ) : (
        <div className="flex h-20 w-20 items-center justify-center rounded-md bg-secondary text-2xl text-text-foreground">
          <MdImage />
        </div>
      )}
      <div className="w-[calc(100%-80px)]">
        <p className="flex items-center gap-2 text-sm font-semibold capitalize text-text-foreground">
          {name}{" "}
          {isPinned && (
            <span className="rounded-full bg-secondary p-0.5 text-xs text-text-foreground">
              <MdPushPin />
            </span>
          )}
        </p>
        <p className="mb-2 text-xs font-medium text-text-muted">
          {description}
        </p>
        {/* NUMBER OF MEMBERS */}
        <div className="flex w-fit items-center gap-1 rounded-full bg-primary px-2 py-px text-xs font-bold text-white">
          {totalMembers} <MdPeople className="text-sm" />
        </div>
      </div>
    </Link>
  );
};

export default RoomCard;
