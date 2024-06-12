import { User } from "@/types";
import Avatar from "../shared/Avatar";
import { getRoleIcon } from "@/utils";
import Button from "../shared/Button";

interface RoomMembersProps {
  members: User[];
  kickedMembers: User[];
}

const RoomMembers = ({ members, kickedMembers }: RoomMembersProps) => {
  const isMemberKicked = (member: User) => {
    return kickedMembers.some((kickedMember) => kickedMember.id === member.id);
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
                size="sm"
              />
              <span className="flex items-center gap-1 font-bold">
                {member.username} {getRoleIcon(member.role, "xs")}
              </span>
            </div>

            {member.role !== "OWNER" &&
              (isMemberKicked(member) ? (
                <Button
                  type="button"
                  variant="danger"
                  size="sm"
                  onClick={() => {
                    console.log("kicked");
                  }}
                >
                  Unkick
                </Button>
              ) : (
                <Button
                  type="button"
                  variant="primary"
                  size="sm"
                  onClick={() => {
                    console.log("kick");
                  }}
                >
                  Kick
                </Button>
              ))}
          </div>
        ))}
    </div>
  );
};

export default RoomMembers;
