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
}

const Message = ({
  user,
  message,
  time,
  isUserDropdownOpen,
  toggleUserDropdown,
}: MessageProps) => {
  const { setCurrentUser, setIsChatWindowOpen } = useChatWindow();
  return (
    <div className="flex w-full items-start gap-2 bg-transparent px-2 py-2 odd:bg-muted md:px-5">
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
