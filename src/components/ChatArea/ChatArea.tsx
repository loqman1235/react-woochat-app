import { Message, MessageSkeleton } from "@/components/ChatArea/Message";
import { useEffect, useState } from "react";
import ChatInput from "./ChatInput";
import useFetch from "@/hooks/useFetch";
import { MessageType } from "@/types";

interface ChatAreaProps {
  roomId: string;
}

const ChatArea = ({ roomId }: ChatAreaProps) => {
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

  return (
    <div
      className={`
        h-full
        w-[--chat-area-width] 
        flex-[3]  
        overflow-y-auto 
        bg-background
        
      `}
    >
      {/*  MESSAGES CONTAINER */}
      <div className="scrollbar-hide h-[calc(100%-48px)] w-full overflow-y-auto bg-background py-2 md:py-5">
        {/* Loading */}
        {isLoading &&
          Array.from({ length: 2 }).map((_, i) => <MessageSkeleton key={i} />)}
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
      <ChatInput />
    </div>
  );
};

export default ChatArea;
