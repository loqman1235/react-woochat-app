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
import { useEffect, useState } from "react";
import useAuth from "@/hooks/useAuth";
import { Modal } from "../shared/Modal";
import Button from "../shared/Button";
import useRoom from "@/hooks/useRoom";
import useSocket from "@/hooks/useSocket";

interface RoomCardProps extends Room {
  totalMembers: number;
}

const RoomCard = ({
  id,
  name,
  roomImage,
  totalMembers,
  description,
  isPinned,
}: RoomCardProps) => {
  const socket = useSocket();
  const { user } = useAuth();
  const { deleteRoom, toggleRoomPin, setRooms } = useRoom();
  const [showOptionsDropdown, setShowOptionsDropdown] = useState(false);
  const [showRemoveModal, setShowRemoveModal] = useState(false);

  // Toggle options dropdown
  const toggleOptionsDropdown = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setShowOptionsDropdown((prev: boolean) => !prev);
  };

  // Toggle remove modal
  const toggleRemoveModal = () => {
    setShowRemoveModal((prev: boolean) => !prev);
  };

  const handleDeleteRoom = () => {
    deleteRoom(id);
    setShowRemoveModal(false);
    if (socket) socket.emit("delete_room", { roomId: id, name });
  };

  useEffect(() => {
    if (!socket) return;

    socket.on("delete_room", ({ roomId }) => {
      setRooms((prevRooms) => prevRooms.filter((room) => room.id !== roomId));
    });

    return () => {
      socket.off("delete_room");
    };
  }, [setRooms, socket]);

  return (
    <>
      <Link
        to={`/rooms/${id}`}
        className="flex items-center gap-3 rounded-md bg-foreground p-3 shadow transition duration-300 hover:bg-muted"
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
        <div className="flex h-full w-[calc(100%-80px)] items-center justify-between">
          {/* INFO */}
          <div className="flex h-full flex-1 flex-col justify-between">
            <div className="flex flex-col gap-2">
              <h3 className="flex items-center gap-2 font-extrabold capitalize text-text-foreground">
                {name}{" "}
                {isPinned && (
                  <span
                    className="rounded-full bg-secondary p-0.5 text-xs text-text-foreground"
                    title="pinned"
                  >
                    <MdPushPin />
                  </span>
                )}
              </h3>
              <p className="mb-2 text-sm font-medium text-text-muted">
                {description}
              </p>
            </div>
            {/* NUMBER OF MEMBERS */}
            {totalMembers > 0 && (
              <div className="flex w-fit items-center gap-1 rounded-full bg-primary px-2 py-px text-xs font-bold text-white">
                {totalMembers} <MdPeople className="text-sm" />
              </div>
            )}
          </div>
          {/* OPTIONS */}
          {user?.role === "OWNER" && (
            <div className="relative">
              <button
                className="text-2xl text-text-muted-2 transition duration-300 hover:text-text-foreground"
                onClick={toggleOptionsDropdown}
              >
                <MdMoreVert />
              </button>

              <Dropdown isOpen={showOptionsDropdown}>
                <DropdownItem
                  text={`${isPinned ? "Unpin" : "Pin"} "${name}"`}
                  icon={<MdPushPin />}
                  handleClick={() => toggleRoomPin(id)}
                />
                <DropdownItem text={`Edit "${name}"`} icon={<MdEdit />} />
                <DropdownItem
                  text={`Delete "${name}"`}
                  icon={<MdDelete />}
                  bgColor="danger"
                  handleClick={toggleRemoveModal}
                />
              </Dropdown>
            </div>
          )}
        </div>
      </Link>

      {/* Remove Room Modal */}
      <Modal isOpen={showRemoveModal} onClose={() => setShowRemoveModal(false)}>
        <div>
          <h2 className="text-center text-xl text-text-foreground">
            Are you sure you want to delete {name}?
          </h2>
          <div className="mt-5 flex justify-center gap-2">
            <Button variant="danger" type="button" onClick={handleDeleteRoom}>
              Delete
            </Button>
            <Button
              variant="secondary"
              type="button"
              onClick={() => setShowRemoveModal(false)}
            >
              Cancel
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default RoomCard;
