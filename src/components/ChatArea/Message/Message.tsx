// import { MdFlag, MdThumbUp } from "react-icons/md";
import { formatDate, getRoleIcon } from "@/utils";
import Avatar from "@/components/shared/Avatar";
import { Dropdown, DropdownItem } from "@/components/shared/Dropdown";
import {
  MdAccountCircle,
  MdBlock,
  MdDelete,
  MdEmail,
  MdFlag,
  MdLogout,
  MdMoreHoriz,
  MdPersonAdd,
  MdReply,
  MdVerified,
} from "react-icons/md";
// import useChatWindow from "@/hooks/useChatWindow";
import { MessageType } from "@/types";
import useProfile from "@/hooks/useProfile";
import useAuth from "@/hooks/useAuth";
import { useEffect, useState } from "react";
import api from "@/services/api";
import useSocket from "@/hooks/useSocket";

interface MessageProps extends MessageType {
  isOnlineInRoom: boolean;
  isUserDropdownOpen: boolean;
  toggleUserDropdown: () => void;
}

const STAFF_ROLES = ["OWNER", "ADMIN", "MOD"];

const Message = ({
  id,
  user: sender,
  isOnlineInRoom,
  content,
  isDeleted,
  createdAt,
  isUserDropdownOpen,
  toggleUserDropdown,
}: MessageProps) => {
  // const { setCurrentUser, setIsChatWindowOpen } = useChatWindow();
  const socket = useSocket();
  const { setIsProfileOpen, setCurrentUser } = useProfile();
  const [isMessageMarkedAsDeleted, setIsMessageMarkedAsDeleted] =
    useState(isDeleted);
  const [isMessageOptionsOpen, setIsMessageOptionsOpen] = useState(false);
  const { user } = useAuth();

  const isOwnProfile = user?.id === sender.id;

  const animatedText =
    sender.role === "OWNER" ||
    sender.role === "ADMIN" ||
    sender.role === "MOD" ||
    sender.role === "PREMIUM"
      ? "animated-text"
      : null;

  const toggleMessageOptionsDropdown = () => {
    setIsMessageOptionsOpen((prev) => !prev);
  };

  const handleMarkAsDeleted = async () => {
    try {
      await api.patch(`/messages/${id}`);
      socket?.emit("mark_message_deleted", id);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const handleOnMarkMessageDeleted = (messageId: string) => {
      if (messageId === id) {
        setIsMessageMarkedAsDeleted(true);
      }
    };

    socket?.on("mark_message_deleted", handleOnMarkMessageDeleted);

    return () => {
      socket?.off("mark_message_deleted", handleOnMarkMessageDeleted);
    };
  }, [id, socket]);

  return (
    <div
      className={`flex w-full items-start gap-2 px-2 py-2 md:px-5 ${isOwnProfile && "flex-row-reverse"}`}
    >
      <div className="relative" onClick={toggleUserDropdown}>
        <Avatar
          src={sender.avatar?.secure_url || "/default_avatar.png"}
          gender={sender.gender}
          isBordered
          size="md"
          isOnline={isOnlineInRoom}
        />
        <Dropdown
          isOpen={isUserDropdownOpen}
          position={isOwnProfile ? "right" : "left"}
        >
          {!isOwnProfile && (
            <>
              <DropdownItem icon={<MdEmail />} text="Private" />{" "}
              <DropdownItem icon={<MdPersonAdd />} text="Send Request" />
            </>
          )}
          <DropdownItem
            icon={<MdAccountCircle />}
            text="View Profile"
            handleClick={() => {
              setIsProfileOpen(true);
              setCurrentUser(sender);
            }}
          />

          {/* Kick */}
          {user &&
            STAFF_ROLES.includes(user?.role) &&
            sender.role !== "OWNER" &&
            !isOwnProfile && (
              <>
                <DropdownItem
                  icon={<MdLogout />}
                  text={`Kick ${sender?.username}`}
                  bgColor="danger"
                />
                <DropdownItem
                  icon={<MdBlock />}
                  text={`Ban ${sender?.username}`}
                  bgColor="danger"
                />
              </>
            )}
        </Dropdown>
      </div>

      <div className="flex-[1]">
        {/* HEADER */}
        <div
          className={`mb-2 flex items-center gap-2 ${isOwnProfile && "flex-row-reverse justify-start"}`}
        >
          <div
            className={`flex items-center gap-1 ${isOwnProfile && "flex-row-reverse"}`}
          >
            <span>{getRoleIcon(sender.role, "xs")}</span>
            <h5
              className={`flex items-center gap-1 text-sm font-extrabold text-text-foreground ${animatedText}`}
            >
              {sender.username}{" "}
              {sender?.verified && (
                <span className="text-xs text-success" title="Verified">
                  <MdVerified />
                </span>
              )}
            </h5>
          </div>
          {/* Add an html dot */}
          <span className="text-xs text-text-muted">•</span>
          <div className="flex items-center gap-2 text-xs">
            <span className="text-text-muted">{formatDate(createdAt)}</span>
          </div>
        </div>
        {/* MESSAGE */}
        <div
          className={`group flex items-center gap-1 ${isOwnProfile && "flex-row-reverse justify-start"}`}
        >
          <div
            className={`w-fit rounded-full rounded-tl-none bg-foreground p-4 text-text-foreground shadow-sm ${isOwnProfile && "!rounded-tl-full rounded-tr-none bg-primary text-white"}`}
          >
            {isMessageMarkedAsDeleted ? (
              <p
                className={`text-sm italic ${isOwnProfile ? "text-white" : "text-text-muted-2"}`}
              >
                Message has been deleted
              </p>
            ) : (
              <p className="text-sm">{content}</p>
            )}

            {/* {media && (
            <img
              src={media}
              className="mt-2 h-[200px] w-full rounded-md object-cover md:w-[300px]"
            />
          )} */}
          </div>
          {!isMessageMarkedAsDeleted && (
            <button
              className="relative text-xl text-text-muted-2 opacity-0 transition duration-300 hover:text-text-foreground group-hover:opacity-100"
              onClick={toggleMessageOptionsDropdown}
            >
              <MdMoreHoriz />

              <Dropdown
                isOpen={isMessageOptionsOpen}
                position={isOwnProfile ? "right" : "left"}
              >
                {isOwnProfile ? (
                  <>
                    <DropdownItem
                      icon={<MdDelete />}
                      text="Delete"
                      bgColor="danger"
                      handleClick={handleMarkAsDeleted}
                    />
                  </>
                ) : (
                  <>
                    <DropdownItem
                      icon={<MdReply />}
                      text="Reply"
                      bgColor="default"
                    />
                    {STAFF_ROLES.includes(user?.role || "") && (
                      <>
                        <DropdownItem
                          icon={<MdDelete />}
                          text="Delete"
                          bgColor="danger"
                        />
                      </>
                    )}
                    <DropdownItem
                      icon={<MdFlag />}
                      text="Report"
                      bgColor="danger"
                    />
                  </>
                )}
              </Dropdown>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Message;
