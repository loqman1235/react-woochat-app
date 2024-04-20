import { MdClose, MdMinimize, MdOpenInFull } from "react-icons/md";
import Avatar from "../shared/Avatar";
import ChatInput from "../ChatArea/ChatInput";
import useChatWindow from "@/hooks/useChatWindow";
import { useState } from "react";

const ChatWindow = () => {
  const { isChatWindowOpen, toggleChatWindow, currentUser } = useChatWindow();
  const [isMinimized, setIsMinimized] = useState(false);

  const toggleMinimize = () => {
    setIsMinimized((prev) => !prev);
  };

  return (
    <div
      className={`absolute bottom-0 right-0 z-40 w-full cursor-pointer shadow-lg transition-transform duration-500 ease-[cubic-bezier(0.87,0,0.13,1)] md:w-[380px] ${isChatWindowOpen ? "block" : "hidden"} ${isMinimized ? "translate-y-[calc(100%-40px)]" : "translate-y-0"} `}
    >
      {/* HEADER */}
      <div className="flex items-center justify-between overflow-hidden rounded-tl-md rounded-tr-md border border-border bg-muted px-2 py-1 md:px-5">
        <div className="flex items-center gap-2">
          <Avatar
            size="sm"
            gender={currentUser.gender}
            username={currentUser.username}
            src={currentUser.avatar}
            isBordered
          />
          <h5 className="text-sm font-bold text-text-foreground">
            {currentUser.username}
          </h5>
        </div>

        {/* CTAS */}
        <div className="text-text-foregroundnp flex h-full items-center gap-5 text-xl">
          <button className="transition duration-300 hover:text-text-foreground">
            <MdOpenInFull />
          </button>
          <button
            className="mb-2 transition duration-300 hover:text-text-foreground"
            onClick={toggleMinimize}
          >
            <MdMinimize />
          </button>
          <button
            className="transition duration-300 hover:text-text-foreground"
            onClick={toggleChatWindow}
          >
            <MdClose />
          </button>
        </div>
      </div>

      {/* BODY */}
      <div className="min-h-[320px] w-full bg-background px-5 py-2">
        {/* MESSAGES */}
      </div>

      {/* FOOTER */}
      <div>
        <ChatInput />
      </div>
    </div>
  );
};

export default ChatWindow;
