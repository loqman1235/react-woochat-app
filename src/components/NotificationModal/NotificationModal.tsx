import { MdClose, MdDelete, MdNotifications } from "react-icons/md";
import NotificationItem from "./NotificationItem";
import { useTheme } from "@/hooks/useTheme";
import useNotification from "@/hooks/useNotification";
import { useEffect } from "react";

interface NotificationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const NotificationModal = ({ isOpen, onClose }: NotificationModalProps) => {
  const { theme } = useTheme();
  const { notifications } = useNotification();

  console.log(notifications, "notifications");

  const bgColor = theme === "light" ? "bg-foreground" : "bg-muted";

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isOpen]);

  return (
    <div
      onClick={onClose}
      className={`fixed inset-0 z-50 flex h-screen w-full items-center justify-center backdrop-blur-sm ${isOpen ? "block" : "hidden"} overflow-y-auto p-5 ${theme === "light" ? "bg-black/50" : "bg-neutral-400/80"}`}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`z-50 mt-2.5 w-full rounded-xl border border-border text-base text-text-foreground md:w-[420px] ${bgColor}`}
      >
        {/* HEADER */}
        <div className="flex w-full items-center justify-between border-b border-b-border p-3">
          <div className="flex items-center gap-2">
            <span className="text-lg text-text-muted">
              <MdNotifications />
            </span>
            <span className="text-base font-extrabold">Notifications</span>
          </div>

          <div className="flex items-center gap-2">
            {notifications.length > 0 && (
              <button className="text-lg text-danger">
                <MdDelete />
              </button>
            )}
            <button
              onClick={onClose}
              className="text-2xl text-text-muted transition duration-300 hover:text-text-foreground"
            >
              <MdClose />
            </button>
          </div>
        </div>

        {/* NOTIFICATIONS */}

        <ul className="flex max-h-80 flex-col items-start overflow-y-auto px-1.5">
          {notifications.map((notification) => (
            <NotificationItem key={notification.id} {...notification} />
          ))}

          {notifications.length === 0 && (
            <li className="px-3 py-2 text-sm text-text-muted">
              No notifications yet.
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default NotificationModal;
