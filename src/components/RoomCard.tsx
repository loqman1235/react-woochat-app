import { MdPeople } from "react-icons/md";
import { Link } from "react-router-dom";

interface RoomCardProps {
  name: string;
  image: string;
  totalMembers: number;
  description?: string;
}

const RoomCard = ({
  name,
  image,
  totalMembers,
  description,
}: RoomCardProps) => {
  return (
    <Link
      to="/chat"
      className="flex items-center gap-3 rounded-md bg-foreground p-3 shadow transition duration-300 hover:bg-muted"
    >
      {/* ROOM IMAGE */}
      <div className="h-20 w-20 overflow-hidden rounded-md">
        <img src={image} alt={name} className="h-full w-full object-cover" />
      </div>
      <div className="w-[calc(100%-80px)]">
        <p className="text-sm font-semibold text-text-foreground">{name}</p>
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
