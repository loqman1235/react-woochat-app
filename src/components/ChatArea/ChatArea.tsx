import { Message, MessageSkeleton } from "@/components/ChatArea/Message";
import { useEffect, useRef, useState } from "react";
import ChatInput from "./ChatInput";
import useFetch from "@/hooks/useFetch";
import { MessageType } from "@/types";
import useSocket from "@/hooks/useSocket";
import { playSound } from "@/utils";
import MessageReceivedSound from "@/assets/sounds/message_received.mp3";
import { AnimatePresence, motion } from "framer-motion";

interface ChatAreaProps {
  roomId: string;
}

const ChatArea = ({ roomId }: ChatAreaProps) => {
  const socket = useSocket();
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const [messages, setMessages] = useState<MessageType[]>([]);
  const { data: messagesData, isLoading } = useFetch<{
    messages: MessageType[];
  }>(`/messages/room/${roomId}`);
  const [initialMessagesLoaded, setInitialMessagesLoaded] = useState(false);

  useEffect(() => {
    if (messagesData) {
      setMessages(messagesData.messages);
      setInitialMessagesLoaded(true);
    }
  }, [messagesData]);

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
      playSound(MessageReceivedSound);
    };

    socket.on("receiveRoomMessage", handleReceiveRoomMessage);

    // Clean up the socket event listeners on component unmount
    return () => {
      socket.off("receiveRoomMessage", handleReceiveRoomMessage);
    };
  }, [socket]);

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
                initialMessagesLoaded ? { opacity: 0, y: 20, scale: 0 } : {}
              }
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{
                duration: 0.3,
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
