import Message from "./Message";

const ChatArea = () => {
  return (
    <div className="absolute right-[--users-area-width] min-h-full w-[--chat-area-width] bg-background p-5">
      <Message />
      <Message />
      <Message />
      <Message />
      <Message />
    </div>
  );
};

export default ChatArea;
