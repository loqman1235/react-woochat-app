import { MdMenu, MdVolumeUp } from "react-icons/md";

const Footer = () => {
  return (
    <footer className="fixed bottom-0 z-40 flex h-12 w-full items-center justify-between gap-5 border-t border-t-border bg-foreground px-5 text-2xl text-text-foreground">
      {/* COPYRIGHT */}
      <p className="text-sm text-text-muted">WooChat © 2024</p>
      <div className="flex h-full items-center gap-5">
        <button>
          <MdVolumeUp />
        </button>
        <button>
          <MdMenu />
        </button>
      </div>
    </footer>
  );
};

export default Footer;
