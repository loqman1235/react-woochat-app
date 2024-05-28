import { useEffect, useState } from "react";

// ICONS
import {
  MdMenu,
  MdEmail,
  MdPerson2,
  MdNotifications,
  MdAccountCircle,
  MdLogout,
} from "react-icons/md";

import NotifCounter from "./shared/NotifCounter";
import { Dropdown, DropdownItem } from "./shared/Dropdown";
import ThemToggleSwitch from "./shared/ThemToggleSwitch";
import Avatar from "./shared/Avatar";
import { useSidebarToggle } from "@/hooks/useSidebarToggle";
import Brand from "./shared/Brand";
import useAuth from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import useProfile from "@/hooks/useProfile";
import { debugLog, playSound } from "@/utils";
import useSocket from "@/hooks/useSocket";
import useNotification from "@/hooks/useNotification";

// Sound fx
import notificationSound from "@/assets/sounds/notification.mp3";
import useSound from "@/hooks/useSound";
import { NotificationModal } from "./NotificationModal";

const Navbar = () => {
  const socket = useSocket();
  const {
    setNotifications,
    markNotificationsAsRead,
    unreadNotificationsCount,
    setUnreadNotificationsCount,
  } = useNotification();
  const { isPlaying } = useSound();
  const { signoutUser, user } = useAuth();
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const { toggleMainMenu } = useSidebarToggle();
  const { setIsProfileOpen, setCurrentUser } = useProfile();
  const [isNotificationDropdownOpen, setIsNotificationDropdownOpen] =
    useState(false);

  const toggleNotificationDropdown = async () => {
    markNotificationsAsRead();
    setIsNotificationDropdownOpen((prev) => !prev);
  };

  const toggleProfileDropdown = () => {
    setIsProfileDropdownOpen((prev) => !prev);
  };

  const navigate = useNavigate();

  // Unread Notifications count

  // Sign Out
  const handleSignOut = async () => {
    try {
      await signoutUser();
      setIsProfileDropdownOpen(false);
      navigate("/sign-in");
    } catch (error) {
      debugLog(error);
    }
  };

  // Notification listener
  useEffect(() => {
    if (socket) {
      socket.on("notification_send", (notification) => {
        setNotifications((prevNotifications) => [
          notification,
          ...prevNotifications,
        ]);
        setUnreadNotificationsCount((prevCount) => prevCount + 1);

        if (isPlaying) {
          playSound(notificationSound);
        }
      });
    }

    return () => {
      socket?.off("notification_send");
    };
  }, [isPlaying, setNotifications, setUnreadNotificationsCount, socket]);

  return (
    <>
      <div className="fixed top-0 z-40 h-12 w-full border-b border-b-border bg-foreground px-2 text-text-foreground md:px-5">
        <div className="container mx-auto flex h-full max-w-full items-center justify-between">
          <div className="flex h-full items-center gap-2 md:gap-5">
            <button
              className="text-2xl"
              onClick={() => {
                toggleMainMenu();
              }}
            >
              <MdMenu />
            </button>

            {/* BRAND */}
            <Brand />
          </div>

          <div className="flex items-center gap-2 text-2xl md:gap-5">
            <ThemToggleSwitch />

            <button className="relative text-text-muted">
              <MdEmail />
              <NotifCounter count={0} />
            </button>
            <button className="relative text-text-muted">
              <MdPerson2 />
              <NotifCounter count={0} />
            </button>
            <button
              className={`relative  ${isNotificationDropdownOpen ? "text-text-foreground" : "text-text-muted"}`}
              onClick={toggleNotificationDropdown}
            >
              <MdNotifications />
              <NotifCounter count={unreadNotificationsCount} />
            </button>
            <div className="relative">
              <Avatar
                src={
                  user?.avatar && user.avatar.secure_url
                    ? user.avatar.secure_url
                    : "/default_avatar.png"
                }
                gender={user?.gender as "male" | "female"}
                onClick={toggleProfileDropdown}
                size="sm"
              />

              <Dropdown isOpen={isProfileDropdownOpen}>
                <DropdownItem
                  text="Profile"
                  icon={<MdAccountCircle />}
                  handleClick={() => {
                    setIsProfileDropdownOpen(false);
                    setIsProfileOpen(true);
                    setCurrentUser(user);
                  }}
                />
                <DropdownItem
                  text="Logout"
                  icon={<MdLogout />}
                  handleClick={handleSignOut}
                />
              </Dropdown>
            </div>
          </div>
        </div>
      </div>

      {/* Notification Modal */}
      <NotificationModal
        isOpen={isNotificationDropdownOpen}
        onClose={() => setIsNotificationDropdownOpen(false)}
      />
    </>
  );
};

export default Navbar;
