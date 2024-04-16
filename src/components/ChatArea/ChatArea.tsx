import Message from "./Message";
import ChatInput from "./ChatInput";
import { messages } from "@/data/messages";

const ChatArea = () => {
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
      <div className="scrollbar-hide h-[calc(100%-48px)] w-full overflow-y-auto bg-background">
        {messages.map((message) => (
          <Message key={message.user.id} {...message} />
        ))}
      </div>

      {/* CHAT INPUT */}
      <ChatInput />
    </div>
  );
};

export default ChatArea;
