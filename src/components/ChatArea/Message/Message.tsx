// import { MdFlag, MdThumbUp } from "react-icons/md";
import { formatDate, getRoleIcon, parseUrls } from "@/utils";
import Avatar from "@/components/shared/Avatar";
import { Dropdown, DropdownItem } from "@/components/shared/Dropdown";
import {
  MdAccountCircle,
  MdBlock,
  MdClose,
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
import BotAvatar from "@/components/shared/BotAvatar";
import { useTheme } from "@/hooks/useTheme";
import { toast } from "react-toastify";

interface MessageProps extends MessageType {
  isOnlineInRoom: boolean;
  isUserDropdownOpen: boolean;
  toggleUserDropdown: () => void;
  isBotMessage?: boolean;
  roomId: string;
}

const STAFF_ROLES = ["OWNER", "ADMIN", "MOD"];

const Message = ({
  id,
  user: sender,
  isOnlineInRoom,
  content,
  files,
  isDeleted,
  createdAt,
  isUserDropdownOpen,
  toggleUserDropdown,
  isBotMessage,
  roomId,
}: MessageProps) => {
  // const { setCurrentUser, setIsChatWindowOpen } = useChatWindow();
  const { theme } = useTheme();
  const socket = useSocket();
  const { setIsProfileOpen, setCurrentUser } = useProfile();
  const [isMessageMarkedAsDeleted, setIsMessageMarkedAsDeleted] =
    useState(isDeleted);
  const [isMessageOptionsOpen, setIsMessageOptionsOpen] = useState(false);
  const { user } = useAuth();
  const [previewImageUrl, setPreviewImageUrl] = useState("");
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);

  const isOwnProfile = user?.id === sender.id;

  const animatedText =
    sender.role === "OWNER" ||
    sender.role === "ADMIN" ||
    sender.role === "MOD" ||
    sender.role === "PREMIUM"
      ? "animated-text"
      : null;

  // Handle kick user
  const handleKickUser = async () => {
    if (!roomId || !sender.id) return;

    try {
      const response = await api.post(`/rooms/${roomId}/kick/${sender.id}`);

      if (response.status === 200) {
        socket?.emit("kick_user", { roomId, userId: sender.id });
        toast.success("User kicked successfully");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleImagePreview = (url: string) => {
    setPreviewImageUrl(url);
    setIsImageModalOpen((prev) => !prev);
  };

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
    <>
      <div
        className={`flex w-full items-start gap-2 px-2 py-2 md:px-5 ${isOwnProfile && "flex-row-reverse"}`}
      >
        <div className="relative" onClick={toggleUserDropdown}>
          {isBotMessage ? (
            <BotAvatar size="md" />
          ) : (
            <Avatar
              src={sender.avatar?.secure_url || "/default_avatar.png"}
              gender={sender.gender}
              isBordered
              size="md"
              isOnline={isOnlineInRoom}
            />
          )}
          {!isBotMessage && (
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
                      handleClick={handleKickUser}
                    />
                    <DropdownItem
                      icon={<MdBlock />}
                      text={`Ban ${sender?.username}`}
                      bgColor="danger"
                    />
                  </>
                )}
            </Dropdown>
          )}
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
                  <span className="text-xs text-success">
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
              className={`w-fit rounded-3xl rounded-tl-none bg-foreground p-4 text-text-foreground shadow-sm ${isOwnProfile && "!rounded-tl-3xl rounded-tr-none bg-primary text-white"} break-words`}
            >
              {isMessageMarkedAsDeleted ? (
                <p
                  className={`text-sm italic ${isOwnProfile ? "text-white" : "text-text-muted-2"}`}
                >
                  Message has been deleted
                </p>
              ) : (
                content && (
                  <p
                    className="text-sm"
                    dangerouslySetInnerHTML={{ __html: parseUrls(content) }}
                  ></p>
                )
              )}

              {/* Files here */}
              {!isMessageMarkedAsDeleted && files && (
                <div className={`flex gap-2 ${files.length > 0 && "mt-2"}`}>
                  {files.map((file) => (
                    <div key={file.id} className="relative w-fit">
                      <img
                        src={file.secure_url}
                        alt={file.secure_url}
                        className="max-h-80 max-w-full cursor-pointer overflow-hidden rounded-xl object-cover"
                        onClick={() => handleImagePreview(file.secure_url)}
                        loading="lazy"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
            {!isMessageMarkedAsDeleted && !isBotMessage && (
              <button
                className="relative text-xl text-text-muted-2 opacity-0 transition duration-300 hover:text-text-foreground group-hover:opacity-100"
                onClick={toggleMessageOptionsDropdown}
              >
                <MdMoreHoriz />

                <Dropdown
                  isOpen={isMessageOptionsOpen}
                  position={isOwnProfile ? "left" : "right"}
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

      {/* Image full screen preview */}
      <div
        className={`fixed inset-0 z-50 flex min-h-screen w-full items-center justify-center backdrop-blur-md ${isImageModalOpen ? "block" : "hidden"} overflow-y-auto p-5 md:p-10 ${theme === "light" ? "bg-black/50" : "bg-neutral-400/50"}`}
        onClick={() => {
          setIsImageModalOpen(false);
        }}
      >
        <div onClick={(e) => e.stopPropagation()}>
          <img
            src={previewImageUrl}
            alt="image"
            className="max-h-[480px] max-w-full object-contain shadow-2xl"
          />
        </div>
        <div>
          <button
            className="absolute right-3 top-3 text-2xl text-white"
            onClick={() => setIsImageModalOpen(false)}
          >
            <MdClose />
          </button>
        </div>
      </div>
    </>
  );
};

export default Message;
