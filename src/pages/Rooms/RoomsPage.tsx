import { MainMenu } from "@/components/MainMenu";
import { RoomCard, SkeletonRoomCard } from "@/components/RoomCard";
import Button from "@/components/shared/Button";
import useAuth from "@/hooks/useAuth";

// Icons
import { MdAdd } from "react-icons/md";

import { Modal } from "@/components/shared/Modal";
import { useEffect, useState } from "react";
import CreateRoomForm from "@/components/Forms/CreateRoomForm";
import useRoom from "@/hooks/useRoom";
import useSocket from "@/hooks/useSocket";
import { Room } from "@/types";

const RoomsPage = () => {
  const socket = useSocket();
  const { user } = useAuth();
  const { isLoading, error, setRooms, pinnedRooms, unpinnedRooms } = useRoom();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  useEffect(() => {
    if (!socket) return;

    const handleOnlineUsers = ({
      roomId,
      totalMembers,
    }: {
      roomId: string;
      totalMembers: number;
    }) => {
      // console.log("online_users", { roomId, totalMembers });

      setRooms((prevRooms) =>
        prevRooms.map((room) =>
          room.id === roomId ? { ...room, totalMembers } : room,
        ),
      );
    };

    const handleCreateRoom = (newRoom: Room) => {
      console.log("create_room", newRoom);
      setRooms((prevRooms) => [newRoom, ...prevRooms]);
    };

    const handleUpdateRoom = (updatedRoom: Room) => {
      setRooms((prevRooms) =>
        prevRooms.map((room) =>
          room.id === updatedRoom.id ? updatedRoom : room,
        ),
      );
    };

    socket.on("online_room_users", handleOnlineUsers);
    socket.on("create_room", handleCreateRoom);
    socket.on("update_room", handleUpdateRoom);

    return () => {
      socket.off("online_room_users", handleOnlineUsers);
      socket.off("create_room", handleCreateRoom);
      socket.off("update_room", handleUpdateRoom);
    };
  }, [socket, setRooms]);

  return (
    <main className="relative top-[48px] flex h-[calc(100vh-48px-48px)] w-full items-center overflow-hidden">
      <MainMenu />

      <div className="h-full w-[calc(100%-var(--main-menu-width))] flex-[3] overflow-y-auto bg-background p-2 py-5 md:p-5">
        <div className="mb-5 flex w-full items-center justify-between">
          <h3 className="text-xl font-extrabold text-text-foreground">Rooms</h3>

          {user && user.role === "OWNER" && (
            <Button variant="primary" type="button" onClick={handleModal}>
              <MdAdd className="text-xl" /> Create
            </Button>
          )}
        </div>

        {isLoading && (
          <div className="grid w-full grid-cols-1 gap-5 md:grid-cols-2">
            {[...Array(10)].map((_, i) => (
              <SkeletonRoomCard key={i} />
            ))}
          </div>
        )}

        {pinnedRooms.length > 0 && (
          <div className="mb-5 grid w-full grid-cols-1 gap-5 border-b border-b-border pb-5 md:grid-cols-2">
            {pinnedRooms.map((room) => (
              <RoomCard
                key={room.id}
                {...room}
                totalMembers={room.totalMembers || 0}
              />
            ))}
          </div>
        )}

        {unpinnedRooms.length > 0 && (
          <div className="grid w-full grid-cols-1 gap-5 md:grid-cols-2 ">
            {unpinnedRooms.map((room) => (
              <RoomCard
                key={room.id}
                {...room}
                totalMembers={room.totalMembers || 0}
              />
            ))}
          </div>
        )}
        <div className="w-full  text-text-muted">{error && error}</div>
      </div>

      {/* Create room modal */}
      <Modal
        title="Create room"
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      >
        <CreateRoomForm handleCloseModal={setIsModalOpen} />
      </Modal>
    </main>
  );
};

export default RoomsPage;
