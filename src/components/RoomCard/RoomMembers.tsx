import { User } from "@/types";
import Avatar from "../shared/Avatar";
import { createNotification, formatRole, getRoleIcon } from "@/utils";
import {
  MdAccountCircle,
  MdLogout,
  MdMoreHoriz,
  MdNotInterested,
} from "react-icons/md";
import { Dropdown, DropdownItem } from "../shared/Dropdown";
import { useState } from "react";
import useAuth from "@/hooks/useAuth";
import useProfile from "@/hooks/useProfile";
import { handleKickUser, handleUnkickUser } from "@/services/room";
import useSocket from "@/hooks/useSocket";
import api from "@/services/api";

interface RoomMembersProps {
  roomId: string;
  members: User[];
  kickedMembers: User[];
}

const RoomMembers = ({
  members,
  kickedMembers: initialKickedMembers,
  roomId,
}: RoomMembersProps) => {
  const socket = useSocket();
  const { user } = useAuth();
  const { setIsProfileOpen, setCurrentUser } = useProfile();
  const [openDropdownId, setOpenDropdownId] = useState<string | null>(null);
  const [kickedMembers, setKickedMembers] =
    useState<User[]>(initialKickedMembers);

  const isMemberKicked = (member: User) => {
    return kickedMembers.some((kickedMember) => kickedMember.id === member.id);
  };

  // Toggle Members dropdown
  const toggleMembersDropdown = (id: string) => {
    setOpenDropdownId((prevId) => (prevId === id ? null : id));
  };

  const kickUser = async (memberId: string) => {
    await handleKickUser(memberId, roomId);
    const kickedMember = members.find((member) => member.id === memberId);
    if (kickedMember) {
      setKickedMembers([...kickedMembers, kickedMember]);
    }

    socket?.emit("kick_user", { roomId, sender: kickedMember });

    const kickNotification = createNotification("USER_KICKED", memberId, true);

    await api.post("/notifications", kickNotification);

    socket?.emit("kicked_notification_send", {
      kickNotification,
      receiver: kickedMember,
    });

    setOpenDropdownId(null);
  };

  const unkickUser = async (memberId: string) => {
    await handleUnkickUser(memberId, roomId);
    setKickedMembers(kickedMembers.filter((member) => member.id !== memberId));

    const unkickedMember = kickedMembers.find(
      (member) => member.id === memberId,
    );

    socket?.emit("unkick_user", { roomId, sender: unkickedMember });

    setOpenDropdownId(null);
  };

  return (
    <div className="flex flex-col gap-5 text-text-foreground">
      {members &&
        members.length > 0 &&
        members.map((member) => (
          <div
            key={member.id}
            className="flex items-center justify-between gap-2"
          >
            <div className="flex items-center gap-2">
              <Avatar
                src={member.avatar?.secure_url}
                gender={member.gender}
                size="md"
              />
              <span className="flex items-center gap-1 font-bold">
                <div className="flex flex-col items-start">
                  <div className="flex items-center gap-2">
                    <span className="flex items-center gap-1 font-bold tracking-tight">
                      {member.username} {getRoleIcon(member.role, "xs")}
                    </span>
                    {isMemberKicked(member) && (
                      <span
                        className="text-sm font-medium text-danger"
                        title="Kicked"
                      >
                        <MdNotInterested />
                      </span>
                    )}
                  </div>
                  <span className="text-sm font-medium text-text-muted">
                    {formatRole(member.role)}
                  </span>
                </div>
              </span>
            </div>

            <div className="relative">
              {member.role !== "OWNER" && member.id !== user?.id && (
                <button
                  onClick={() => toggleMembersDropdown(member.id)}
                  className="rounded-full p-1 text-2xl text-text-muted-2 transition duration-300 hover:bg-muted hover:text-text-foreground"
                >
                  <MdMoreHoriz />
                </button>
              )}

              <Dropdown isOpen={openDropdownId === member.id}>
                <DropdownItem
                  text="Profile"
                  icon={<MdAccountCircle />}
                  handleClick={() => {
                    setIsProfileOpen(true);
                    setCurrentUser(member);
                  }}
                />
                {member.role !== "OWNER" && isMemberKicked(member) ? (
                  <DropdownItem
                    text={`Unkick ${member?.username}`}
                    icon={<MdLogout />}
                    bgColor="danger"
                    handleClick={() => unkickUser(member.id)}
                  />
                ) : (
                  <DropdownItem
                    text={`Kick ${member?.username}`}
                    icon={<MdLogout />}
                    bgColor="danger"
                    handleClick={() => kickUser(member.id)}
                  />
                )}
                <DropdownItem
                  text={`Ban ${member?.username}`}
                  icon={<MdNotInterested />}
                  bgColor="danger"
                />
              </Dropdown>
            </div>
          </div>
        ))}
    </div>
  );
};

export default RoomMembers;
