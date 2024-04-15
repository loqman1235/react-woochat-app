import Message from "./Message";

const ChatArea = () => {
  return (
    <div className="absolute right-[--users-area-width] h-screen w-[--chat-area-width]  overflow-y-auto  bg-background pb-20">
      {/* INSIDE DIV */}
      <div className="min-h-full w-full">
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
    </div>
  );
};

export default ChatArea;
