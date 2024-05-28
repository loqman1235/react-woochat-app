import Avatar from "../shared/Avatar";
import { NotificationType } from "@/types";
import { formatDate, formatNotificationMessage } from "@/utils";
import BotAvatar from "../shared/BotAvatar";

const NotificationItem = ({
  type,
  sender,
  createdAt,
  isSystem,
}: NotificationType) => {
  return (
    <li className="flex w-full items-center gap-5 rounded-md border-b border-b-border py-3 last:border-none">
      {/* AVATAR */}
      <div className="relative">
        {isSystem ? (
          <BotAvatar size="md" />
        ) : (
          <Avatar
            gender={sender?.gender}
            size="md"
            src={sender.avatar?.secure_url}
          />
        )}
      </div>

      <div className="flex flex-col items-start">
        <h5 className="text-sm font-extrabold">
          {isSystem ? "System" : sender?.username}
        </h5>
        <div>
          <p className="line-clamp-1 text-sm text-text-muted">
            {formatNotificationMessage(type)}
          </p>
        </div>
        <div className="flex items-center gap-1 text-xs text-text-muted">
          <span>{formatDate(createdAt)}</span>
        </div>
      </div>
    </li>
  );
};

export default NotificationItem;
