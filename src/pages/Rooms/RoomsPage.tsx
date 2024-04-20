import { MainMenu } from "@/components/MainMenu";

const RoomsPage = () => {
  return (
    <main className="relative top-[48px] flex h-[calc(100vh-48px-48px)] w-full items-center overflow-hidden">
      <MainMenu />

      <div className="h-full w-[calc(100%-var(--main-menu-width))] flex-[3] overflow-y-auto bg-background">
        Rooms
      </div>
    </main>
  );
};

export default RoomsPage;
