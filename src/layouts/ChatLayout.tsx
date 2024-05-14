import { ChatArea } from "@/components/ChatArea";
import { ChatWindow } from "@/components/ChatWindow";
import { MainMenu } from "@/components/MainMenu";
import { UsersMenu } from "@/components/UsersMenu";
import useAuth from "@/hooks/useAuth";
import useFetch from "@/hooks/useFetch";
import useSocket from "@/hooks/useSocket";
import { Room, User } from "@/types";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ChatLayout = () => {
  const { user } = useAuth();
  const socket = useSocket();
  const { roomId } = useParams();
  const [onlineUsers, setOnlineUsers] = useState<User[] | []>([]);
  const { data: roomResult, isLoading } = useFetch<{ room: Room }>(
    `/rooms/${roomId}`,
  );

  // Connect to the socket and join the room
  useEffect(() => {
    if (socket) {
      socket.connect();
      socket.emit("join_room", { user, roomId });

      socket.on("online_users", (data) => {
        // Filter out the current user
        setOnlineUsers(data.filter((u: User) => u.id !== user?.id));
      });
    }

    return () => {
      if (socket) {
        socket.disconnect();
      }
    };
  }, [socket, roomId, user]);

  return (
    <main className="relative top-[48px] flex h-[calc(100vh-48px-48px)] w-full items-center overflow-hidden">
      <MainMenu />
      <ChatArea roomId={roomId || ""} />
      <UsersMenu
        onlineUsers={onlineUsers}
        roomName={roomResult?.room.name || ""}
        isLoading={isLoading}
      />
      <ChatWindow />
    </main>
  );
};

export default ChatLayout;
