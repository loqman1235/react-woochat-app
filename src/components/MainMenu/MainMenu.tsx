// Icons
import useAuth from "@/hooks/useAuth";
import useProfile from "@/hooks/useProfile";
import { useSidebarToggle } from "@/hooks/useSidebarToggle";
import { useState } from "react";
import {
  MdCheckCircle,
  MdStorage,
  MdAccountBox,
  MdMenuBook,
  MdRssFeed,
  MdNewspaper,
  MdStar,
  MdDoNotDisturbOnTotalSilence,
  MdAccessTimeFilled,
} from "react-icons/md";
import { Link } from "react-router-dom";

const MainMenu = () => {
  const { mainMenuOpen } = useSidebarToggle();
  const { setIsProfileOpen, setCurrentUser } = useProfile();
  const { user } = useAuth();

  const listStyles =
    "w-full border-b border-border px-2 md:px-5 py-3 last:border-0 overflow-hidden cursor-pointer w-full hover:bg-foreground hover:bg-opacity-10 transition duration-300 ease-in-out";
  const subListStyles =
    "w-full py-3 last:border-0 last:pb-0 grayscale hover:grayscale-0 transition duration-300 ease-in-out";

  const [isStatusOpen, setIsStatusOpen] = useState(false);

  const toggleStatus = () => {
    setIsStatusOpen(!isStatusOpen);
  };

  return (
    <div
      className={`fixed top-12 h-full w-[var(--main-menu-mobile-width)] flex-[1] border-r border-r-border bg-foreground text-text-foreground md:relative md:top-0 md:w-[var(--main-menu-width)] ${mainMenuOpen ? "hidden md:block" : "block md:hidden"} z-30 transition duration-300 ease-in-out`}
    >
      <ul>
        <li className={listStyles} onClick={toggleStatus}>
          <button className="flex items-center gap-2">
            <span className="text-success">
              <MdCheckCircle />
            </span>
            <span>Online</span>
          </button>

          <ul
            className={`max-h-0 transition-all duration-500 ease-in-out  ${isStatusOpen && "max-h-96"}`}
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <li className={subListStyles}>
              <button className="flex items-center gap-2">
                <span className="text-success">
                  <MdCheckCircle />
                </span>
                <span>Online</span>
              </button>
            </li>
            <li className={subListStyles}>
              <button className="flex items-center gap-2">
                <span className="text-warning">
                  <MdAccessTimeFilled />
                </span>
                <span>Away</span>
              </button>
            </li>
            <li className={subListStyles}>
              <button className="flex items-center gap-2">
                <span className="text-danger">
                  <MdDoNotDisturbOnTotalSilence />
                </span>
                <span>Busy</span>
              </button>
            </li>
          </ul>
        </li>

        <li className={listStyles}>
          <Link to="/" className="flex w-full items-center gap-2">
            <span className="text-text-muted">
              <MdStorage />
            </span>
            <span>Rooms</span>
          </Link>
        </li>

        <li className={listStyles}>
          <button
            className="flex w-full items-center gap-2"
            onClick={() => {
              setIsProfileOpen(true);
              setCurrentUser(user);
            }}
          >
            <span className="text-text-muted">
              <MdAccountBox />
            </span>
            <span>My profile</span>
          </button>
        </li>

        <li className={listStyles}>
          <button className="flex items-center gap-2">
            <span className="text-text-muted">
              <MdMenuBook />
            </span>
            <span>Rules</span>
          </button>
        </li>

        <li className={listStyles}>
          <button className="flex items-center gap-2">
            <span className="text-text-muted">
              <MdRssFeed />
            </span>
            <span>Wall</span>
          </button>
        </li>

        <li className={listStyles}>
          <button className="flex items-center gap-2">
            <span className="text-text-muted">
              <MdNewspaper />
            </span>
            <span>News</span>
          </button>
        </li>

        <li className={listStyles}>
          <button className="flex items-center gap-2">
            <span className="text-text-muted">
              <MdStar />
            </span>
            <span>Top 100</span>
          </button>
        </li>
      </ul>
    </div>
  );
};

export default MainMenu;
