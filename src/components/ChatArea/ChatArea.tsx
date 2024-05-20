import { Message, MessageSkeleton } from "@/components/ChatArea/Message";
import { useEffect, useRef, useState } from "react";
import ChatInput from "./ChatInput";
import useFetch from "@/hooks/useFetch";
import { MessageType } from "@/types";
import useSocket from "@/hooks/useSocket";
import { playSound } from "@/utils";
import MessageReceivedSound from "@/assets/sounds/message_received.mp3";
import { AnimatePresence, motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import useRoom from "@/hooks/useRoom";
import AlertSound from "@/assets/sounds/alert.mp3";

interface ChatAreaProps {
  roomId: string;
}

const ChatArea = ({ roomId }: ChatAreaProps) => {
  const socket = useSocket();
  const { setRooms } = useRoom();
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const [newMessageIds, setNewMessageIds] = useState<string[]>([]);
  const [messages, setMessages] = useState<MessageType[]>([]);
  const { data: messagesData, isLoading } = useFetch<{
    messages: MessageType[];
  }>(`/messages/room/${roomId}`);
  const navigate = useNavigate();

  useEffect(() => {
    if (messagesData) {
      setMessages(messagesData.messages);
    }

    if (!messagesData && !isLoading) {
      navigate("/");
    }
  }, [messagesData, isLoading, navigate]);

  const [openDropdownId, setOpenDropdownId] = useState<string | null>(null);

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

    const handleReceiveRoomMessage = (data: MessageType) => {
      setMessages((prevMessages) => [...prevMessages, data]);
      setNewMessageIds((prevIds) => [...prevIds, data.id]);
      playSound(MessageReceivedSound);
    };

    const handleRoomRemoved = (roomId: string) => {
      if (roomId === roomId) {
        setRooms((prevRooms) => prevRooms.filter((room) => room.id !== roomId));
        playSound(AlertSound);
        toast.error("This room has been deleted");
        navigate("/");
      }
    };

    socket.on("receiveRoomMessage", handleReceiveRoomMessage);
    socket.on("delete_room", handleRoomRemoved);

    // Clean up the socket event listeners on component unmount
    return () => {
      socket.off("receiveRoomMessage", handleReceiveRoomMessage);
      socket.off("delete_room", handleRoomRemoved);
    };
  }, [navigate, setRooms, socket]);

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
        className="scrollbar-hide h-[calc(100%-48px)] w-full overflow-y-auto overflow-x-hidden bg-background py-2 md:py-5"
        ref={messagesContainerRef}
      >
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
