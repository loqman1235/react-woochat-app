import Message from "./Message";
import ChatInput from "./ChatInput";
import { messages } from "@/data/messages";
import { useState } from "react";

const ChatArea = () => {
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
        {messages.map((message) => (
          <Message
            key={message.user.id}
            {...message}
            isUserDropdownOpen={openDropdownId === message.user.id}
            toggleUserDropdown={() => toggleDropdown(message.user.id)}
          />
        ))}
      </div>

      {/* CHAT INPUT */}
      <ChatInput />
    </div>
  );
};

export default ChatArea;
