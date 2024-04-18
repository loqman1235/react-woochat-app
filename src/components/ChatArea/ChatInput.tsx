import { MdAttachFile, MdOutlineEmojiEmotions, MdSend } from "react-icons/md";

const ChatInput = () => {
  return (
    <div className="sticky bottom-0 flex h-12 items-center gap-5 border-t border-t-border bg-foreground px-2 py-1 text-text-foreground md:px-5">
      <button className="text-2xl text-text-muted transition duration-300 hover:text-text-foreground">
        <MdOutlineEmojiEmotions />
      </button>
      <form className="flex h-full flex-[1] items-center gap-2">
        <input
          type="text"
          placeholder="Type a message"
          className="h-full w-full rounded-full border border-border bg-background px-5 outline-none placeholder:text-text-muted"
        />

        {/* FILE INPUT */}
        <label htmlFor="file" className="cursor-pointer">
          <input type="file" id="file" className="hidden" />
          <span className="text-2xl text-text-muted transition duration-300 hover:text-text-foreground">
            <MdAttachFile />
          </span>
        </label>

        {/* SEND BUTTON */}
        <button className="flex items-center justify-center rounded-full bg-primary p-2 text-white transition duration-300 hover:bg-primary-hover">
          <MdSend />
        </button>
      </form>
    </div>
  );
};

export default ChatInput;
