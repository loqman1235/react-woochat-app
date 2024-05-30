import BotAvatar from "@/components/shared/BotAvatar";
import { formatDate, getRoleIcon } from "@/utils";
import { MdBuild } from "react-icons/md";

interface BotMessageProps {
  message: string;
}

const BotMessage = ({ message }: BotMessageProps) => {
  return (
    <div className={`flex w-full items-start gap-2 px-2 py-2 md:px-5`}>
      <div className="relative">
        <BotAvatar size="md" />
      </div>

      <div className="flex-[1]">
        {/* HEADER */}
        <div className={`mb-2 flex items-center gap-2`}>
          <div className={`flex items-center gap-1`}>
            <span>{getRoleIcon("MOD", "xs")}</span>
            <h5
              className={`flex items-center gap-1 text-sm font-extrabold text-text-foreground`}
            >
              Bot
              <span className="text-sm text-primary">
                <MdBuild />
              </span>
            </h5>
          </div>
          {/* Add an html dot */}
          <span className="text-xs text-text-muted">•</span>
          <div className="flex items-center gap-2 text-xs">
            <span className="text-text-muted">
              {formatDate(new Date(Date.now()).toISOString())}
            </span>
          </div>
        </div>
        {/* MESSAGE */}
        <div className={`group flex items-center gap-1`}>
          <div
            className={`w-fit rounded-3xl rounded-tl-none bg-foreground p-4 text-text-foreground shadow-sm`}
          >
            {message}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BotMessage;
