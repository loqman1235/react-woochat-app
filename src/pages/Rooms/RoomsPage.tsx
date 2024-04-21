import { MainMenu } from "@/components/MainMenu";
import RoomCard from "@/components/RoomCard";

const RoomsPage = () => {
  return (
    <main className="relative top-[48px] flex h-[calc(100vh-48px-48px)] w-full items-center overflow-hidden">
      <MainMenu />

      <div className="h-full w-[calc(100%-var(--main-menu-width))] flex-[3] overflow-y-auto bg-background p-5">
        <h3 className="mb-5 text-xl font-semibold text-text-foreground">
          Rooms
        </h3>
        <div className="grid w-full grid-cols-1 gap-5 md:grid-cols-2 ">
          <RoomCard
            image="https://picsum.photos/200"
            name="Tech talk"
            description="Dive into the latest in technology, share tips, discuss trends, and explore innovations with fellow tech enthusiasts."
            totalMembers={150}
          />
          <RoomCard
            image="https://picsum.photos/200"
            name="Global Gourmet"
            description="A place for foodies to exchange recipes, discuss cooking techniques, and explore culinary cultures from around the world."
            totalMembers={134}
          />
          <RoomCard
            image="https://picsum.photos/200"
            name="Book Buds"
            description=" Join book lovers as we discuss our latest reads, share recommendations, and occasionally host author Q&A sessions."
            totalMembers={22}
          />
          <RoomCard
            image="https://picsum.photos/200"
            name="Fitness Friends"
            description="Whether you’re a gym rat or a yoga newbie, find motivation, workout tips, and health advice in a supportive community."
            totalMembers={20}
          />
        </div>
      </div>
    </main>
  );
};

export default RoomsPage;
