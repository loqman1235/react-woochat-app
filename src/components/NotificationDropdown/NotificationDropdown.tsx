import { MdDelete, MdNotifications } from "react-icons/md";
import NotificationItem from "./NotificationItem";
import { useTheme } from "@/hooks/useTheme";
import useNotification from "@/hooks/useNotification";

interface NotificationDropdownProps {
  isOpen: boolean;
}

const NotificationDropdown = ({ isOpen }: NotificationDropdownProps) => {
  const { theme } = useTheme();
  const { notifications } = useNotification();

  console.log(notifications, "notifications");

  const bgColor = theme === "light" ? "bg-foreground" : "bg-muted";

  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className={`invisible absolute right-0 top-full z-50 mt-2.5 min-w-[320px] origin-top translate-y-3 rounded-md border border-border text-base text-text-foreground opacity-0 shadow-md transition-all duration-300 ease-[cubic-bezier(0.87,0,0.13,1)] ${isOpen && "!visible !translate-y-0 !opacity-100"} ${bgColor}`}
    >
      {/* HEADER */}
      <div className="flex w-full items-center justify-between border-b border-b-border p-3">
        <div className="flex items-center gap-2">
          <span className="text-lg text-text-muted">
            <MdNotifications />
          </span>
          <span className="text-sm font-bold">Notifications</span>
        </div>

        {notifications.length > 0 && (
          <button className="text-lg text-danger">
            <MdDelete />
          </button>
        )}
      </div>

      {/* NOTIFICATIONS */}

      <ul className="flex max-h-60 flex-col items-start overflow-y-auto px-1.5">
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
  );
};

export default NotificationDropdown;
