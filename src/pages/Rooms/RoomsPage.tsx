import { MainMenu } from "@/components/MainMenu";
import RoomCard from "@/components/RoomCard";
import Button from "@/components/shared/Button";
import useAuth from "@/hooks/useAuth";
import { Link } from "react-router-dom";

// Icons
import { MdAdd } from "react-icons/md";

const RoomsPage = () => {
  const { user } = useAuth();

  return (
    <main className="relative top-[48px] flex h-[calc(100vh-48px-48px)] w-full items-center overflow-hidden">
      <MainMenu />

      <div className="h-full w-[calc(100%-var(--main-menu-width))] flex-[3] overflow-y-auto bg-background p-2 py-5 md:p-5">
        <div className="mb-5 flex w-full items-center justify-between">
          <h3 className="text-xl font-semibold text-text-foreground">Rooms</h3>

          {user && user.role === "ADMIN" && (
            <Link to="/rooms/create">
              <Button variant="primary" type="button">
                <MdAdd /> Create
              </Button>
            </Link>
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
      {/* <div className="fixed left-0 top-0 z-50 flex h-full w-full items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
        <div className="w-[420px] rounded-md bg-background p-5">
          <h3 className="text-xl font-semibold text-text-foreground">
            Create Room
          </h3>

          <form className="mt-5 space-y-5">
            <div className="space-y-2">
              <label htmlFor="roomName" className="block text-text-foreground">
                Room Name
              </label>
              <input
                type="text"
                id="roomName"
                className="border-border-200 w-full rounded-md border bg-background p-2 focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="roomDescription"
                className="block text-text-foreground"
              >
                Room Description
              </label>
              <textarea
                id="roomDescription"
                className="border-border-200 w-full rounded-md border bg-background p-2 focus:outline-none focus:ring-2 focus:ring-primary"
                rows={5}
              ></textarea>
            </div>

            <div className="space-y-2">
              <label htmlFor="roomImage" className="block text-text-foreground">
                Room Image
              </label>
              <input
                type="text"
                id="roomImage"
                className="border-border-200 w-full rounded-md border bg-background p-2 focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div className="flex items-center justify-end space-x-2">
              <Button variant="danger" type="button">
                Cancel
              </Button>
              <Button variant="primary" type="submit">
                Create
              </Button>
            </div>
          </form>
        </div>
      </div> */}
    </main>
  );
};

export default RoomsPage;
