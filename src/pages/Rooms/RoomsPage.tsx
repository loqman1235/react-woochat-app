import { MainMenu } from "@/components/MainMenu";
import RoomCard from "@/components/RoomCard";
import Button from "@/components/shared/Button";
import useAuth from "@/hooks/useAuth";

// Icons
import { MdAdd } from "react-icons/md";
import { Modal } from "@/components/shared/Modal";
import { useState } from "react";
import CreateRoomForm from "@/components/Forms/CreateRoomForm";

const RoomsPage = () => {
  const { user } = useAuth();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <main className="relative top-[48px] flex h-[calc(100vh-48px-48px)] w-full items-center overflow-hidden">
      <MainMenu />

      <div className="h-full w-[calc(100%-var(--main-menu-width))] flex-[3] overflow-y-auto bg-background p-2 py-5 md:p-5">
        <div className="mb-5 flex w-full items-center justify-between">
          <h3 className="text-xl font-semibold text-text-foreground">Rooms</h3>

          {user && user.role === "ADMIN" && (
            <Button variant="primary" type="button" onClick={handleModal}>
              <MdAdd className="text-xl" /> Create
            </Button>
          )}
        </div>
        <div className="grid w-full grid-cols-1 gap-5 md:grid-cols-2 ">
          <RoomCard
            image="https://picsum.photos/200"
            name="main room"
            description="Dive into the latest in technology, share tips, discuss trends, and explore innovations with fellow tech enthusiasts."
            totalMembers={150}
            isPinned
          />
          <RoomCard
            image="https://picsum.photos/200"
            name="global gourmet"
            description="A place for foodies to exchange recipes, discuss cooking techniques, and explore culinary cultures from around the world."
            totalMembers={134}
            isPinned
          />
          <RoomCard
            image="https://picsum.photos/200"
            name="book buds"
            description=" Join book lovers as we discuss our latest reads, share recommendations, and occasionally host author Q&A sessions."
            totalMembers={22}
          />
          <RoomCard
            image="https://picsum.photos/200"
            name="fitness friends"
            description="Whether you’re a gym rat or a yoga newbie, find motivation, workout tips, and health advice in a supportive community."
            totalMembers={20}
          />
        </div>
      </div>

      {/* Create room modal */}
      <Modal
        title="Create room"
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      >
        <CreateRoomForm />
      </Modal>
    </main>
  );
};

export default RoomsPage;
