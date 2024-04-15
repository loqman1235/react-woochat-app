// import { MdFlag, MdThumbUp } from "react-icons/md";
import { getRoleIcon } from "@/utils";
import { UserProps } from "../UsersMenu/User";
import Avatar from "../shared/Avatar";

interface MessageProps {
  user: UserProps;
  message: string;
  time: string;
}

const Message = ({ user, message, time }: MessageProps) => {
  return (
    <div className="flex w-full items-start gap-2 bg-transparent px-5 py-2 odd:bg-muted">
      <Avatar src={user.avatar} gender={user.gender} isBordered size="md" />

      <div className="flex-[1]">
        {/* HEADER */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            <span>{getRoleIcon(user.role, "xs")}</span>
            <h5 className="text-sm font-bold text-text-foreground">
              {user.username}
            </h5>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <span className=" text-text-muted">{time}</span>
          </div>
        </div>
        {/* MESSAGE */}
        <div className="w-full">
          <p className="text-sm text-text-foreground">{message}</p>
        </div>
      </div>
    </div>
  );
};

export default Message;
