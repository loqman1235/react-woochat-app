import { MdAccessTimeFilled, MdCelebration } from "react-icons/md";
import Avatar from "../shared/Avatar";
import { useTheme } from "@/hooks/useTheme";

const NotificationItem = () => {
  const { theme } = useTheme();

  const actionTypeBorderColor =
    theme === "light" ? "border-foreground" : "border-muted";

  return (
    <li className="flex w-full items-center gap-3 rounded-md px-1.5 py-3 hover:bg-muted-hover">
      {/* AVATAR */}
      <div className="relative">
        <Avatar
          gender="female"
          size="md"
          src="https://res.cloudinary.com/dvhhq2ws3/image/upload/v1716364432/chatapp/avatars/uobttebfbli2env1ngyo.png"
        />
        {/* ACTION TYPE */}
        <span
          className={`absolute -right-1 bottom-0 flex items-center justify-center rounded-full border-2 bg-success p-0.5 text-xs text-white ${actionTypeBorderColor}`}
        >
          <MdCelebration />
        </span>
      </div>

      <div className="flex flex-col items-start">
        <h5 className="text-sm font-bold">Axel</h5>
        <p className="line-clamp-1 text-sm text-text-muted">
          Promoted you to an admin
        </p>
        <div className="flex items-center gap-1 text-xs text-text-muted">
          <span>
            <MdAccessTimeFilled />
          </span>
          <span>2 days ago</span>
        </div>
      </div>
    </li>
  );
};

export default NotificationItem;
