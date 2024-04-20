import { ChatArea } from "@/components/ChatArea";
import { ChatWindow } from "@/components/ChatWindow";
import { MainMenu } from "@/components/MainMenu";
import { UsersMenu } from "@/components/UsersMenu";

const ChatLayout = () => {
  return (
    <main className="relative top-[48px] flex h-[calc(100vh-48px-48px)] w-full items-center overflow-hidden">
      <MainMenu />
      <ChatArea />
      <UsersMenu />
      <ChatWindow />
    </main>
  );
};

export default ChatLayout;
