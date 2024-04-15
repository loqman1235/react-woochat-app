import Message from "./Message";
import ChatInput from "./ChatInput";

const ChatArea = () => {
  return (
    <div className="absolute right-[--users-area-width] h-screen w-[--chat-area-width]  overflow-y-auto  bg-background">
      {/*  MESSAGES CONTAINER */}
      <div className="scrollbar-hide h-[calc(100vh-48px-48px)] w-full overflow-y-auto bg-background">
        <Message />
        <Message />
        <Message />
        <Message />
        <Message />
        <Message />
        <Message />
        <Message />
        <Message />
      </div>

      {/* CHAT INPUT */}
      <ChatInput />
    </div>
  );
};

export default ChatArea;
