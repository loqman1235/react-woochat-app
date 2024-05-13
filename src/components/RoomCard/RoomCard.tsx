import { Room } from "@/types";
import {
  MdDelete,
  MdEdit,
  MdImage,
  MdMoreVert,
  MdPeople,
  MdPushPin,
} from "react-icons/md";
import { Link } from "react-router-dom";
import { Dropdown, DropdownItem } from "../shared/Dropdown";
import { useState } from "react";
import { useTheme } from "@/hooks/useTheme";

interface RoomCardProps extends Room {
  totalMembers: number;
}

const RoomCard = ({
  name,
  roomImage,
  totalMembers,
  description,
  isPinned = false,
}: RoomCardProps) => {
  const { theme } = useTheme();
  const [showOptionsDropdown, setShowOptionsDropdown] = useState(false);

  const toggleOptionsDropdown = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setShowOptionsDropdown((prev: boolean) => !prev);
  };

  return (
    <Link
      to="/chat"
      className="group flex items-center gap-3 rounded-md bg-foreground p-3 shadow transition duration-300 hover:bg-muted"
    >
      {/* ROOM IMAGE */}
      {roomImage && roomImage.secure_url ? (
        <div className="h-20 w-20 overflow-hidden rounded-md">
          <img
            src={roomImage.secure_url}
            alt={name}
            className="h-full w-full object-cover"
          />
        </div>
      ) : (
        <div className="flex h-20 w-20 items-center justify-center rounded-md bg-secondary text-2xl text-text-foreground">
          <MdImage />
        </div>
      )}
      <div className="flex w-[calc(100%-80px)] items-center justify-between">
        {/* INFO */}
        <div className="flex-1">
          <p className="flex items-center gap-2 text-sm font-semibold capitalize text-text-foreground">
            {name}{" "}
            {isPinned && (
              <span
                className="rounded-full bg-secondary p-0.5 text-xs text-text-foreground"
                title="pinned"
              >
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
        {/* OPTIONS */}
        <div className="relative">
          <button
            className={`rounded-full p-1 text-xl text-text-foreground opacity-0 transition duration-300  group-hover:opacity-100 ${theme === "light" ? "bg-black/5 hover:bg-black/10" : "bg-white/5 hover:bg-white/10"}`}
            onClick={toggleOptionsDropdown}
          >
            <MdMoreVert />
          </button>

          <Dropdown isOpen={showOptionsDropdown}>
            <DropdownItem text={`Pin "${name}"`} icon={<MdPushPin />} />
            <DropdownItem text={`Edit "${name}"`} icon={<MdEdit />} />
            <DropdownItem
              text={`Delete "${name}"`}
              icon={<MdDelete />}
              bgColor="danger"
            />
          </Dropdown>
        </div>
      </div>
    </Link>
  );
};

export default RoomCard;
