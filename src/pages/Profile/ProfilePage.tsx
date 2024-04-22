import { MainMenu } from "@/components/MainMenu";
import Avatar from "@/components/shared/Avatar";
import { MdCameraAlt, MdClose, MdVerified } from "react-icons/md";

const ProfilePage = () => {
  return (
    <main className="relative top-[48px] flex h-[calc(100vh-48px-48px)] w-full items-center overflow-hidden">
      <MainMenu />

      <div className="h-full w-[calc(100%-var(--main-menu-width))] flex-[3] overflow-y-auto bg-background">
        {/* COVER */}
        <div className="relative h-[200px] w-full bg-secondary before:absolute before:inset-0 before:bg-black before:opacity-70 before:shadow">
          <img
            src="https://picsum.photos/1920/300"
            alt="profile"
            className="h-full w-full object-cover"
          />

          {/* CTAs */}
          <div className="absolute right-5 top-5 flex gap-5 rounded-full bg-muted px-2 py-1 text-xl text-text-foreground opacity-80 shadow">
            <button>
              <MdClose />
            </button>
            <button>
              <MdCameraAlt />
            </button>
          </div>

          {/* AVATAR */}
          <div className="absolute bottom-5 left-2 flex items-end gap-3 md:left-5">
            <div className="relative shadow-md">
              <Avatar
                size="4xl"
                src="https://picsum.photos/200"
                username="Loqmane Djefafla"
                gender="male"
                isBordered
                rounded={false}
              />

              {/* <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-5 rounded-full bg-muted px-2 py-1 text-xl text-text-foreground opacity-80 shadow">
                <button>
                  <MdClose />
                </button>
                <button>
                  <MdCameraAlt />
                </button>
              </div> */}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xl font-bold text-white">
                  Loqmane Djefafla
                </h3>
                <span className="text-success">
                  <MdVerified />
                </span>
              </div>
              {/* MOOD */}
              <p className="text-sm text-text-muted">
                Chat developer and coder
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ProfilePage;
