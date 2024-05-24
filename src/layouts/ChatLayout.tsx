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
    if (!socket || !roomId || !user) return;

    // Join the room and set up event listeners
    socket.emit("join_room", { user, roomId });

    const handleOnlineUsers = ({ users }: { users: User[] }) => {
      // console.log("Online room users", users);
      setOnlineUsers(users.filter((u) => u.id !== user.id));
    };

    socket.on("online_room_users", handleOnlineUsers);

    // Clean up the socket event listeners on component unmount
    return () => {
      socket.off("online_room_users", handleOnlineUsers);
      socket.emit("leave_room", { user, roomId });
    };
  }, [socket, roomId, user]);

  return (
    <main className="relative top-[48px] flex h-[calc(100vh-48px-48px)] w-full items-center overflow-hidden">
      <MainMenu />
      <ChatArea roomId={roomId || ""} roomName={roomResult?.room.name} />
      <UsersMenu onlineUsers={onlineUsers} isLoading={isLoading} />
      <ChatWindow />
    </main>
  );
};

export default ChatLayout;
