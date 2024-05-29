import { Message, MessageSkeleton } from "@/components/ChatArea/Message";
import { useEffect, useRef, useState } from "react";
import ChatInput from "./ChatInput";
import useFetch from "@/hooks/useFetch";
import { MessageType, User } from "@/types";
import useSocket from "@/hooks/useSocket";
import { isUserOnline, playSound } from "@/utils";
import MessageReceivedSound from "@/assets/sounds/message_received.mp3";
import { AnimatePresence, motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import useRoom from "@/hooks/useRoom";
import AlertSound from "@/assets/sounds/alert.mp3";
import useAuth from "@/hooks/useAuth";
import { MdArrowBack } from "react-icons/md";
import Skeleton from "react-loading-skeleton";
import { useTheme } from "@/hooks/useTheme";
import useSound from "@/hooks/useSound";

interface ChatAreaProps {
  roomId: string;
  roomName: string | undefined;
}

const ChatArea = ({ roomId, roomName }: ChatAreaProps) => {
  const { isPlaying } = useSound();
  const { user } = useAuth();
  const socket = useSocket();
  const { theme } = useTheme();
  const { setRooms } = useRoom();
  const [onlineUsers, setOnlineUsers] = useState<User[]>([]);
  // const [globallyOnlineUsers, setGloballyOnlineUsers] = useState<User[]>([]);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const [newMessageIds, setNewMessageIds] = useState<string[]>([]);
  const [messages, setMessages] = useState<MessageType[]>([]);
  const { data: messagesData, isLoading } = useFetch<{
    messages: MessageType[];
  }>(`/messages/room/${roomId}`);
  const navigate = useNavigate();

  const [openDropdownId, setOpenDropdownId] = useState<string | null>(null);

  const baseColor = theme === "dark" ? "#252627" : "#E0E0E0";
  const highlightColor = theme === "dark" ? "#2d2e2f" : "#F5F5F5";

  const toggleDropdown = (id: string) => {
    if (openDropdownId === id) {
      setOpenDropdownId(null);
    } else {
      setOpenDropdownId(id);
    }
  };

  useEffect(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scroll({
        top: messagesContainerRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages]);

  useEffect(() => {
    if (!socket) return;

    // Handle online users
    const handleOnlineUsers = ({ users }: { users: User[] }) => {
      setOnlineUsers(users);
    };

    // Handle receiving a message in the room
    const handleReceiveRoomMessage = (data: MessageType) => {
      setMessages((prevMessages) => [...prevMessages, data]);
      setNewMessageIds((prevIds) => [...prevIds, data.id]);

      if (data.user.id !== user?.id && isPlaying) {
        playSound(MessageReceivedSound);
      }
    };

    // Handle room deletion
    const handleDeleteRoom = ({
      roomId,
      name,
    }: {
      roomId: string;
      name: string;
    }) => {
      if (roomId === roomId) {
        setRooms((prevRooms) => prevRooms.filter((room) => room.id !== roomId));
        playSound(AlertSound);
        toast.error(`Room "${name}" has been deleted!`);
        navigate("/");
      }
    };

    // Handle room deleted
    const handleRoomDeleted = (roomId: string) => {
      if (roomId === roomId) {
        setRooms((prevRooms) => prevRooms.filter((room) => room.id !== roomId));
      }
    };

    // Handle role update
    const handleRoleUpdate = (receiver: User) => {
      messages.forEach((message) => {
        if (message.user.id === receiver.id) {
          message.user.role = receiver.role;
        }
      });
    };

    socket.on("online_room_users", handleOnlineUsers);
    socket.on("receive_room_message", handleReceiveRoomMessage);
    socket.on("delete_room", handleDeleteRoom);
    socket.on("room_deleted", handleRoomDeleted);
    socket.on("role_updated", handleRoleUpdate);

    // Clean up the socket event listeners on component unmount
    return () => {
      socket.off("online_room_users", handleOnlineUsers);
      socket.off("receive_room_message", handleReceiveRoomMessage);
      socket.off("delete_room", handleDeleteRoom);
      socket.off("room_deleted", handleRoomDeleted);
      socket.off("role_updated", handleRoleUpdate);
    };
  }, [isPlaying, messages, navigate, setRooms, socket, user]);

  useEffect(() => {
    if (messagesData) {
      setMessages(messagesData.messages);
    }

    if (!messagesData && !isLoading) {
      navigate("/");
    }
  }, [messagesData, isLoading, navigate]);

  return (
    <div
      className={`
        relative
        h-full 
        w-[--chat-area-width]  
        flex-[3] 
        overflow-y-auto
        bg-background
        
      `}
    >
      {/*  MESSAGES CONTAINER */}
      <div
        className="scrollbar-hide h-[calc(100%-48px)] w-full overflow-y-auto overflow-x-hidden bg-background pb-2 md:pb-5"
        ref={messagesContainerRef}
      >
        {/* ROOM NAME */}
        <div className="sticky top-0 z-30 mb-5 flex h-12 w-full items-center gap-2 border-b border-b-border bg-foreground p-2 md:px-5">
          <button
            className="text-lg text-text-muted transition duration-300 hover:text-text-foreground"
            onClick={() => navigate("/")}
          >
            <MdArrowBack />
          </button>
          {roomName ? (
            <h1 className="text-lg font-extrabold tracking-tight text-text-foreground">
              {roomName}
            </h1>
          ) : (
            <Skeleton
              width={100}
              height={16}
              baseColor={baseColor}
              highlightColor={highlightColor}
              borderRadius={20}
            />
          )}
        </div>

        {/* Loading */}
        {isLoading &&
          Array.from({ length: 4 }).map((_, i) => <MessageSkeleton key={i} />)}
        <AnimatePresence>
          {messages.map((message) => (
            <motion.div
              key={message.id}
              initial={
                newMessageIds.includes(message.id)
                  ? { opacity: 0, y: 50, scale: 0 }
                  : {}
              }
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{
                duration: 0.2,
                type: "spring",
                stiffness: 260,
                damping: 20,
              }}
            >
              <Message
                // isGloballyOnline={isUserOnline(
                //   globallyOnlineUsers,
                //   message.user.id,
                // )}
                isOnlineInRoom={isUserOnline(onlineUsers, message.user.id)}
                {...message}
                isUserDropdownOpen={openDropdownId === message.id}
                toggleUserDropdown={() => toggleDropdown(message.id)}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* CHAT INPUT */}
      <ChatInput roomId={roomId} />
    </div>
  );
};

export default ChatArea;
