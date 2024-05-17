// import { MdFlag, MdThumbUp } from "react-icons/md";
import { formatDate, getRoleIcon } from "@/utils";
import Avatar from "@/components/shared/Avatar";
import { Dropdown, DropdownItem } from "@/components/shared/Dropdown";
import { MdAccountCircle, MdBolt, MdEmail } from "react-icons/md";
// import useChatWindow from "@/hooks/useChatWindow";
import { MessageType } from "@/types";
import useProfile from "@/hooks/useProfile";
import useAuth from "@/hooks/useAuth";

interface MessageProps extends MessageType {
  isUserDropdownOpen: boolean;
  toggleUserDropdown: () => void;
}

const Message = ({
  user: sender,
  content,
  createdAt,
  isUserDropdownOpen,
  toggleUserDropdown,
}: MessageProps) => {
  // const { setCurrentUser, setIsChatWindowOpen } = useChatWindow();
  const { setIsProfileOpen, setCurrentUser } = useProfile();
  const { user } = useAuth();

  const isOwnProfile = user?.id === sender.id;

  return (
    <div className="flex w-full items-start gap-2 px-2 py-2 md:px-5">
      <div className="relative" onClick={toggleUserDropdown}>
        <Avatar
          src={sender.avatar?.secure_url || "/default_avatar.png"}
          gender={sender.gender}
          isBordered
          size="md"
        />
        <Dropdown isOpen={isUserDropdownOpen} position="left">
          {!isOwnProfile && <DropdownItem icon={<MdEmail />} text="Private" />}
          <DropdownItem
            icon={<MdAccountCircle />}
            text="View Profile"
            handleClick={() => {
              setIsProfileOpen(true);
              setCurrentUser(sender);
            }}
          />
          <DropdownItem icon={<MdBolt />} text="Action" bgColor="danger" />
        </Dropdown>
      </div>

      <div className="flex-[1]">
        {/* HEADER */}
        <div className="mb-2 flex items-center gap-2">
          <div className="flex items-center gap-1">
            <span>{getRoleIcon(sender.role, "xs")}</span>
            <h5 className="text-sm font-bold text-text-foreground">
              {sender.username}
            </h5>
          </div>
          {/* Add an html dot */}
          {/* <span className="text-xs text-text-muted">•</span> */}
          <div className="flex items-center gap-2 text-xs">
            <span className="text-text-muted">{formatDate(createdAt)}</span>
          </div>
        </div>
        {/* MESSAGE */}
        <div className="w-fit rounded-2xl rounded-tl-none bg-foreground p-4 shadow-sm">
          <p className="text-sm text-text-foreground">{content}</p>
          {/* {media && (
            <img
              src={media}
              className="mt-2 h-[200px] w-full rounded-md object-cover md:w-[300px]"
            />
          )} */}
        </div>
      </div>
    </div>
  );
};

export default Message;
