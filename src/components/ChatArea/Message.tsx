// import { MdFlag, MdThumbUp } from "react-icons/md";
import { getRoleIcon } from "@/utils";
import { UserProps } from "../UsersMenu/User";
import Avatar from "../shared/Avatar";
import { Dropdown, DropdownItem } from "../shared/Dropdown";
import { MdAccountCircle, MdBolt, MdEmail } from "react-icons/md";
import useChatWindow from "@/hooks/useChatWindow";

interface MessageProps {
  user: UserProps;
  message: string;
  time: string;
  isUserDropdownOpen: boolean;
  toggleUserDropdown: () => void;
  media?: string;
}

const Message = ({
  user,
  message,
  time,
  media,
  isUserDropdownOpen,
  toggleUserDropdown,
}: MessageProps) => {
  const { setCurrentUser, setIsChatWindowOpen } = useChatWindow();
  return (
    <div className="flex w-full items-start gap-2 px-2 py-2 md:px-5">
      <div className="relative" onClick={toggleUserDropdown}>
        <Avatar src={user.avatar} gender={user.gender} isBordered size="md" />
        <Dropdown isOpen={isUserDropdownOpen} position="left">
          <DropdownItem
            icon={<MdEmail />}
            text="Private"
            handleClick={() => {
              setIsChatWindowOpen(true);
              setCurrentUser(user);
            }}
          />
          <DropdownItem icon={<MdAccountCircle />} text="View Profile" />
          <DropdownItem icon={<MdBolt />} text="Action" />
        </Dropdown>
      </div>

      <div className="flex-[1]">
        {/* HEADER */}
        <div className="mb-2 flex items-center gap-2">
          <div className="flex items-center gap-1">
            <span>{getRoleIcon(user.role, "xs")}</span>
            <h5 className="text-sm font-bold text-text-foreground">
              {user.username}
            </h5>
          </div>
          {/* Add an html dot */}
          {/* <span className="text-xs text-text-muted">•</span> */}
          <div className="flex items-center gap-2 text-xs">
            <span className="text-text-muted">{time}</span>
          </div>
        </div>
        {/* MESSAGE */}
        <div className="w-fit rounded-2xl rounded-tl-none bg-foreground p-4 shadow-sm">
          <p className="text-sm text-text-foreground">{message}</p>
          {media && (
            <img
              src={media}
              className="mt-2 h-[200px] w-full rounded-md object-cover md:w-[300px]"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Message;
