import { Room } from "@/types";
import {
  MdDelete,
  MdEdit,
  MdImage,
  MdLogout,
  MdMoreVert,
  MdPeople,
  MdPeopleAlt,
  MdPushPin,
} from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { Dropdown, DropdownItem } from "../shared/Dropdown";
import { useEffect, useState } from "react";
import useAuth from "@/hooks/useAuth";
import { Modal } from "../shared/Modal";
import Button from "../shared/Button";
import useRoom from "@/hooks/useRoom";
import useSocket from "@/hooks/useSocket";
import UpdateRoomForm from "../Forms/UpdateRoomForm";
import useFetch from "@/hooks/useFetch";
import { toast } from "react-toastify";
import { AxiosError } from "axios";
import api from "@/services/api";

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
  const { deleteRoom, toggleRoomPin, setRooms, getRoom } = useRoom();
  const [showOptionsDropdown, setShowOptionsDropdown] = useState(false);
  const [showRemoveModal, setShowRemoveModal] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const { data: roomResult } = useFetch<{ room: Room }>(`/rooms/${id}`);
  const room = getRoom(id);
  const navigate = useNavigate();

  const isUserJoined =
    room && room.joinedUsers && room.joinedUsers.some((u) => u.id === user?.id);

  const isUserKicked =
    room && room.kickedUsers && room.kickedUsers.some((u) => u.id === user?.id);

  console.log(`Did user join ${room?.name}`, isUserJoined);

  const handleJoiningRoom = async () => {
    if (isUserKicked) {
      toast.error("You have been kicked from this room");
      return;
    }

    if (isUserJoined) {
      navigate(`/rooms/${id}`);
    } else {
      try {
        const response = await api.post(`/rooms/${id}/join`);
        if (response.status === 201) {
          navigate(`/rooms/${id}`);
        }
      } catch (error) {
        if (error instanceof AxiosError) {
          toast.error(error.response?.data.message);
        }
      }
    }
  };

  // Toggle options dropdown
  const toggleOptionsDropdown = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setShowOptionsDropdown((prev: boolean) => !prev);
  };

  // Toggle remove modal
  const toggleRemoveModal = () => {
    setShowRemoveModal((prev: boolean) => !prev);
  };

  // Toggle update modal
  const toggleUpdateModal = () => {
    setIsUpdateModalOpen((prev: boolean) => !prev);
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

  useEffect(() => {
    if (roomResult && roomResult.room) {
      setRooms((prevRooms) =>
        prevRooms.map((room) => (room.id === id ? roomResult.room : room)),
      );
    }
  }, [id, roomResult, setRooms]);

  return (
    <>
      <div
        onClick={(e) => {
          e.stopPropagation();
          handleJoiningRoom();
        }}
        className="flex cursor-pointer items-center gap-3 rounded-xl bg-foreground p-3 shadow transition duration-300 hover:bg-muted"
      >
        {/* ROOM IMAGE */}
        {roomImage && roomImage.secure_url ? (
          <div className="h-20 w-20 overflow-hidden rounded-xl">
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

          <div className="relative" onClick={(e) => e.stopPropagation()}>
            <button
              className="text-2xl text-text-muted-2 transition duration-300 hover:text-text-foreground"
              onClick={toggleOptionsDropdown}
            >
              <MdMoreVert />
            </button>

            <Dropdown isOpen={showOptionsDropdown}>
              {user?.role === "OWNER" && (
                <>
                  <DropdownItem
                    text={`${isPinned ? "Unpin" : "Pin"} "${name}"`}
                    icon={<MdPushPin />}
                    handleClick={() => toggleRoomPin(id)}
                  />
                  <DropdownItem
                    text="Members"
                    icon={<MdPeopleAlt />}
                    handleClick={() => console.log("Users")}
                  />
                  <DropdownItem
                    text={`Edit "${name}"`}
                    icon={<MdEdit />}
                    handleClick={toggleUpdateModal}
                  />
                  <DropdownItem
                    text={`Delete "${name}"`}
                    icon={<MdDelete />}
                    bgColor="danger"
                    handleClick={toggleRemoveModal}
                  />
                </>
              )}
              <DropdownItem
                text={`Leave "${name}"`}
                bgColor="danger"
                icon={<MdLogout />}
                handleClick={() => console.log("Leave")}
              />
            </Dropdown>
          </div>
        </div>
      </div>

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

      {/* Update room modal */}
      <Modal
        title={`Edit "${name}"`}
        isOpen={isUpdateModalOpen}
        onClose={() => setIsUpdateModalOpen(false)}
      >
        <UpdateRoomForm
          handleCloseModal={setIsUpdateModalOpen}
          roomId={id}
          name={room?.name || ""}
          description={room?.description || ""}
        />
      </Modal>

      {/* Room members model */}
      {/* <Modal title={`"${room?.name}" Members`} isOpen onClose={() => {}}>
        Hello
      </Modal> */}
    </>
  );
};

export default RoomCard;
