import useAuth from "@/hooks/useAuth";
import useSocket from "@/hooks/useSocket";
import api from "@/services/api";
import { debugLog } from "@/utils";
import { useState } from "react";
import { MdOutlineEmojiEmotions, MdSend } from "react-icons/md";

interface ChatInputProps {
  roomId?: string;
}

const ChatInput = ({ roomId }: ChatInputProps) => {
  const { user } = useAuth();
  const [content, setContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const socket = useSocket();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!content.trim()) return;

    if (socket) {
      socket.emit("sendRoomMessage", { roomId, content, user });
    }

    try {
      setIsSubmitting(true);
      const response = await api.post(`/messages/${roomId}`, { content });
      setIsSubmitting(false);

      if (response.status === 201) {
        setContent("");
      }
    } catch (error) {
      setIsSubmitting(false);
      debugLog(error);
    }
  };

  return (
    <div className="sticky bottom-0 flex h-12 items-center gap-5 border-t border-t-border bg-foreground px-2 py-1 text-text-foreground md:px-5">
      <button className="text-2xl text-text-muted transition duration-300 hover:text-text-foreground">
        <MdOutlineEmojiEmotions />
      </button>
      <form
        className="flex h-full flex-[1] items-center gap-2"
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          placeholder="Type a message"
          className="h-full w-full rounded-full border border-border bg-background px-5 outline-none placeholder:text-text-muted"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

        {/* FILE INPUT */}
        {/* <label htmlFor="file" className="cursor-pointer">
          <input type="file" id="file" className="hidden" />
          <span className="text-2xl text-text-muted transition duration-300 hover:text-text-foreground">
            <MdAttachFile />
          </span>
        </label> */}

        {/* SEND BUTTON */}
        <button
          className="flex items-center justify-center rounded-full bg-primary p-2 text-white transition duration-300 hover:bg-primary-hover disabled:cursor-not-allowed disabled:opacity-50"
          disabled={isSubmitting || !content.trim()}
        >
          <MdSend />
        </button>
      </form>
    </div>
  );
};

export default ChatInput;
