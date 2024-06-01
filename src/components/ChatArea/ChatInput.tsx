import useAuth from "@/hooks/useAuth";
import useSocket from "@/hooks/useSocket";
import api from "@/services/api";
import { debugLog } from "@/utils";
import { useState } from "react";
import {
  MdAttachFile,
  MdClose,
  MdOutlineEmojiEmotions,
  MdSend,
} from "react-icons/md";

interface ChatInputProps {
  roomId?: string;
}

const ChatInput = ({ roomId }: ChatInputProps) => {
  const { user } = useAuth();
  const [content, setContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const socket = useSocket();

  const handleFilesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      setFiles(Array.from(files));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!content && files.length === 0) return;

    if (!roomId) {
      return;
    }

    // If there are files to upload

    const formData = new FormData();
    formData.append("content", content);

    if (files.length > 0) {
      files.forEach((file) => {
        formData.append("files", file);
      });
    }

    const messageId = Math.random().toString(36).substring(2, 9);

    if (socket) {
      socket.emit("send_room_message", {
        roomId,
        messageId,
        content,
        user,
      });

      setContent("");
      setFiles([]);
    }

    try {
      setIsSubmitting(true);
      const response = await api.post(`/messages/${roomId}`, formData);
      setIsSubmitting(false);

      if (response.status === 201) {
        setContent("");
        setFiles([]);

        console.log(response.data, "Response from server");

        // Update the message with the permanent URLs returned by the server
        if (socket) {
          socket.emit("update_room_message", {
            roomId,
            messageId,
            files: response.data.createdMessage.files,
          });
        }
      }
    } catch (error) {
      setIsSubmitting(false);
      debugLog(error);
    }
  };

  return (
    <div className="absolute bottom-0 flex  w-full items-center gap-5 border-t border-t-border bg-foreground px-2 py-1 text-text-foreground md:px-5">
      <button className="text-2xl text-text-muted transition duration-300 hover:text-text-foreground">
        <MdOutlineEmojiEmotions />
      </button>
      <form
        className="flex h-full flex-[1] items-center gap-2"
        onSubmit={handleSubmit}
      >
        <div className="flex h-full w-full flex-col gap-2 rounded-3xl border border-border bg-background px-5 py-3">
          {/* TEXT INPUT */}
          <input
            type="text"
            placeholder="Type a message"
            className="h-full w-full bg-transparent text-text-foreground outline-none placeholder:text-text-muted"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          {/* Display files here */}
          {files.length > 0 && (
            <div className="flex items-center gap-2">
              {files.map((file) => (
                <div key={file.name} className="flex items-center gap-2">
                  {file.type.startsWith("image/") ? (
                    <div className="relative h-10 w-10  overflow-hidden rounded-md border border-border">
                      <img
                        src={URL.createObjectURL(file)}
                        alt={file.name}
                        className="h-full w-full object-cover"
                      />
                      <button
                        className="absolute right-0.5 top-0.5 flex items-center justify-center rounded-full bg-primary p-px text-xs text-white transition duration-300"
                        onClick={() =>
                          setFiles(files.filter((f) => f.name !== file.name))
                        }
                      >
                        <MdClose />
                      </button>
                    </div>
                  ) : (
                    <div className="relative h-10 w-10 overflow-hidden rounded-md border border-border ">
                      <video
                        src={URL.createObjectURL(file)}
                        className="h-full w-full object-cover"
                      />
                      <button
                        type="button"
                        className="absolute right-0.5 top-0.5 flex items-center justify-center rounded-full bg-primary p-px text-xs text-white transition duration-300"
                        onClick={(e) => {
                          e.stopPropagation();
                          setFiles(files.filter((f) => f.name !== file.name));
                        }}
                      >
                        <MdClose />
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* FILES INPUT */}
        <label htmlFor="file" className="cursor-pointer">
          <input
            type="file"
            id="file"
            className="hidden"
            name="files"
            multiple
            onChange={handleFilesChange}
          />
          <span className="text-2xl text-text-muted transition duration-300 hover:text-text-foreground">
            <MdAttachFile />
          </span>
        </label>

        {/* SEND BUTTON */}
        <button
          className="flex items-center justify-center rounded-full bg-primary p-2 text-white transition duration-300 hover:bg-primary-hover disabled:cursor-not-allowed disabled:opacity-50"
          disabled={isSubmitting || (!content.trim() && !files.length)}
        >
          <MdSend />
        </button>
      </form>
    </div>
  );
};

export default ChatInput;
