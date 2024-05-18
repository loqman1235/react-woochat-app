import { useSidebarToggle } from "@/hooks/useSidebarToggle";
import { MdMenu, MdVolumeUp } from "react-icons/md";

const Footer = () => {
  const { toggleUsersMenu } = useSidebarToggle();
  return (
    <footer className="fixed bottom-0 z-40 flex h-12 w-full items-center justify-between gap-5 border-t border-t-border bg-foreground px-2 text-2xl text-text-foreground md:px-5">
      {/* COPYRIGHT */}
      <p className="text-sm text-text-muted">
        SomethinChat © 2024{" "}
        <a
          href="https://www.facebook.com/loqman.axel.djefafla/"
          target="_blank"
          className="font-semibold text-primary"
        >
          by Loqmane
        </a>
      </p>
      <div className="flex h-full items-center gap-5">
        <button>
          <MdVolumeUp />
        </button>
        <button
          onClick={() => {
            toggleUsersMenu();
          }}
        >
          <MdMenu />
        </button>
      </div>
    </footer>
  );
};

export default Footer;
