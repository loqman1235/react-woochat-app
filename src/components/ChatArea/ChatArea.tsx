import { Message, MessageSkeleton } from "@/components/ChatArea/Message";
import { useEffect, useRef, useState } from "react";
import ChatInput from "./ChatInput";
import useFetch from "@/hooks/useFetch";
import { MessageType } from "@/types";
import useSocket from "@/hooks/useSocket";
import { playSound } from "@/utils";
import MessageReceivedSound from "@/assets/sounds/message_received.mp3";

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

  useEffect(() => {
    if (messagesData) {
      setMessages(messagesData.messages);
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
        className="scrollbar-hide h-[calc(100%-48px-48px)] w-full overflow-y-auto bg-background py-2 md:py-5"
        ref={messagesContainerRef}
      >
        {/* Loading */}
        {isLoading &&
          Array.from({ length: 4 }).map((_, i) => <MessageSkeleton key={i} />)}
        {messages.map((message) => (
          <Message
            key={message.id}
            {...message}
            isUserDropdownOpen={openDropdownId === message.id}
            toggleUserDropdown={() => toggleDropdown(message.id)}
          />
        ))}
      </div>

      {/* CHAT INPUT */}
      <ChatInput roomId={roomId} />
    </div>
  );
};

export default ChatArea;
