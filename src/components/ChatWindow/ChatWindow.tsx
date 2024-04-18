import { MdClose, MdMinimize, MdOpenInFull } from "react-icons/md";
import Avatar from "../shared/Avatar";
import ChatInput from "../ChatArea/ChatInput";
import useChatWindow from "@/hooks/useChatWindow";

const ChatWindow = () => {
  const { isChatWindowOpen, toggleChatWindow, currentUser } = useChatWindow();

  return (
    <div
      className={`absolute bottom-0 right-0 z-40 w-full shadow-2xl  md:w-[400px] ${isChatWindowOpen ? "block" : "hidden"}`}
    >
      {/* HEADER */}
      <div className="flex items-center justify-between overflow-hidden rounded-tl-md rounded-tr-md border border-border bg-muted px-5 py-1">
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
        <div className="flex h-full items-center gap-5 text-xl">
          <button className="transition duration-300 hover:text-text-foreground">
            <MdOpenInFull />
          </button>
          <button className="mb-2 transition duration-300 hover:text-text-foreground">
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
