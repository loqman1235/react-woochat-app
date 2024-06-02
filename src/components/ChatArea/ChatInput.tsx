import useAuth from "@/hooks/useAuth";
import useSocket from "@/hooks/useSocket";
import api from "@/services/api";
import { debugLog } from "@/utils";
import { AxiosProgressEvent } from "axios";
import { useState } from "react";
import {
  MdAttachFile,
  MdClose,
  MdOutlineEmojiEmotions,
  MdSend,
} from "react-icons/md";

import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

interface ChatInputProps {
  roomId?: string;
}

interface FileWithProgress {
  file: File;
  progress: number;
}

const ChatInput = ({ roomId }: ChatInputProps) => {
  const { user } = useAuth();
  const [content, setContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [files, setFiles] = useState<FileWithProgress[]>([]);
  const socket = useSocket();

  const handleFilesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files;
    if (selectedFiles) {
      const fileWithProgressArray = Array.from(selectedFiles).map((file) => ({
        file,
        progress: 0,
      }));
      setFiles((prevFiles) => [...prevFiles, ...fileWithProgressArray]);
    }
  };

  const handleUploadProgress = (
    fileIndex: number,
    progressEvent: AxiosProgressEvent,
  ) => {
    const totalSize = progressEvent.total || 0;
    const loaded = progressEvent.loaded;
    const progress = Math.round((loaded * 100) / totalSize);

    setFiles((prevFiles) =>
      prevFiles.map((file, index) =>
        index === fileIndex ? { ...file, progress } : file,
      ),
    );
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if ((!content && files.length === 0) || !roomId) return;

    try {
      setIsSubmitting(true);
      let uploadedFiles = [];
      if (files.length > 0) {
        const formData = new FormData();
        files.forEach(({ file }) => formData.append("files", file));

        const response = await api.post("/messages/upload", formData, {
          onUploadProgress: (progressEvent) => {
            files.forEach((_, index) =>
              handleUploadProgress(index, progressEvent),
            );
          },
        });

        console.log("Uploaded files");

        setFiles([]);
        uploadedFiles = response.data.uploadedFiles;
      }

      const messageData = {
        content,
        files: uploadedFiles,
      };

      const response = await api.post(`/messages/${roomId}`, messageData);
      setIsSubmitting(false);

      if (response.status === 201) {
        const message = {
          messageId: response.data.createdMessage.id,
          roomId,
          content,
          user,
          files: uploadedFiles,
        };

        if (socket) {
          socket.emit("send_room_message", message);
        }

        setContent("");
        setFiles([]);
      }
    } catch (error) {
      setIsSubmitting(false);
      debugLog(error);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e as unknown as React.FormEvent<HTMLFormElement>);
    }
  };
  return (
    <div className="absolute bottom-0 flex w-full items-center gap-5 border-t border-t-border bg-foreground px-2 py-1 text-text-foreground md:px-5">
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
            onKeyDown={handleKeyDown}
            disabled={isSubmitting}
          />
          {/* Display files here */}
          {files.length > 0 && (
            <div className="flex items-center gap-2">
              {files.map((file, index) => (
                <div key={file.file.name} className="flex items-center gap-2">
                  {file.file.type.startsWith("image/") ? (
                    <div className="relative h-20 w-20 overflow-hidden rounded-xl border border-border">
                      <div className="absolute left-1/2 top-1/2 flex h-full w-full -translate-x-1/2 -translate-y-1/2 items-center justify-center">
                        <span className="h-8 w-8">
                          <CircularProgressbar
                            value={file.progress}
                            styles={buildStyles({
                              pathColor: "#0084ff",
                              strokeLinecap: "round",
                              pathTransitionDuration: 0.5,
                            })}
                          />
                        </span>
                      </div>
                      <img
                        src={URL.createObjectURL(file.file)}
                        alt={file.file.name}
                        className={`h-full w-full object-cover ${file.progress > 0 ? "opacity-50" : "opacity-100"}`}
                      />

                      {!isSubmitting && (
                        <button
                          className="absolute right-1 top-1 -z-40 flex items-center justify-center rounded-full bg-danger p-px text-xs text-white transition duration-300"
                          onClick={() =>
                            setFiles(files.filter((_, i) => i !== index))
                          }
                        >
                          <MdClose />
                        </button>
                      )}
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <div className="flex h-20 w-20 items-center justify-center rounded-xl bg-primary text-2xl">
                        <MdAttachFile className="text-white" />
                      </div>
                      <span>{file.file.name}</span>
                      <button
                        className="flex items-center justify-center rounded-full bg-danger p-px text-xs text-white transition duration-300"
                        onClick={() =>
                          setFiles(files.filter((_, i) => i !== index))
                        }
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
          disabled={(!content && files.length === 0) || isSubmitting}
        >
          <MdSend />
        </button>
      </form>
    </div>
  );
};

export default ChatInput;
