import { MdClose, MdPeopleAlt, MdPersonAdd, MdSearch } from "react-icons/md";
import User from "./User";
import { useSidebarToggle } from "@/hooks/useSidebarToggle";
import { User as UserType } from "@/types";
import Skeleton from "react-loading-skeleton";
import { filterUsersByRole } from "@/utils";
// import useFetch from "@/hooks/useFetch";

interface UsersMenuProps {
  roomName: string;
  isLoading: boolean;
  onlineUsers: UserType[];
}

const UsersMenu = ({ onlineUsers, roomName, isLoading }: UsersMenuProps) => {
  const { usersMenuOpen, toggleUsersMenu } = useSidebarToggle();

  // Filtering online users
  const staffMembers = filterUsersByRole(
    onlineUsers,
    ["ADMIN", "MOD"],
    isLoading,
  );
  const vipMembers = filterUsersByRole(onlineUsers, ["PREMIUM"], isLoading);
  const users = filterUsersByRole(onlineUsers, ["USER"], isLoading);

  // const { data: users, isLoading } = useFetch("/users");
  return (
    <div
      className={`fixed right-0 top-12 h-full flex-[1] border-l border-l-border bg-foreground md:relative md:top-0 ${usersMenuOpen ? "hidden md:block" : "block md:hidden"} z-30 transition duration-300 ease-in-out`}
    >
      {/* USERS MENU HEADER  */}
      <div className="flex h-10 w-full items-center justify-between border-b border-b-border text-2xl">
        <button
          className="h-full px-2 transition duration-300 hover:text-text-foreground md:px-5"
          onClick={() => {
            toggleUsersMenu();
          }}
        >
          <MdClose />
        </button>

        <div className="flex h-full flex-[1] justify-end gap-2 pr-2 text-text-muted md:gap-5 md:pr-5">
          <button className="text-text-foreground">
            <MdPeopleAlt />
          </button>

          <button className="transition duration-300 hover:text-text-foreground">
            <MdPersonAdd />
          </button>

          <button className="transition duration-300 hover:text-text-foreground">
            <MdSearch />
          </button>
        </div>
      </div>

      {/* ROOM NAME */}
      <div className="flex items-center gap-2 px-2 py-2 md:px-5">
        <h5 className="text-sm font-bold text-primary md:text-base">
          {isLoading ? (
            <div className="h-5 w-20 overflow-hidden rounded-md">
              <Skeleton
                height="100%"
                width="100%"
                baseColor="var(--color-primary)"
                highlightColor="var(--color-primary-light)"
                className="rounded-md"
              />
            </div>
          ) : (
            roomName
          )}
        </h5>
      </div>
      {/* ONLINE USERS */}
      <div className="h-[calc(100%-120px)] overflow-y-auto px-[10px] pb-5">
        {onlineUsers.length === 0 && (
          <div className="px-3 text-sm text-text-muted">No users online</div>
        )}
        {staffMembers.length > 0 && (
          <div className="mb-5">
            <h2 className="mb-2 flex items-center gap-2 px-3 text-sm font-semibold text-text-foreground">
              Staff{" "}
              <span className="rounded-full bg-primary px-2 py-px text-xs font-bold text-white">
                {staffMembers.length}
              </span>
            </h2>
            {staffMembers.map((user) => (
              <User key={user.id} {...user} />
            ))}
          </div>
        )}

        {vipMembers.length > 0 && (
          <div className="mb-5">
            <h2 className="mb-2 flex items-center gap-2 px-3 text-sm font-semibold text-text-foreground">
              VIP Members{" "}
              <span className="rounded-full bg-primary px-2 py-px text-xs font-bold text-white">
                {vipMembers.length}
              </span>
            </h2>
            {vipMembers.map((user) => (
              <User key={user.id} {...user} />
            ))}
          </div>
        )}

        {users.length > 0 && (
          <div>
            <h2 className="mb-2 flex items-center gap-2 px-3 text-sm font-semibold text-text-foreground">
              Users{" "}
              <span className="rounded-full bg-primary px-2 py-px text-xs font-bold text-white">
                {users.length}
              </span>
            </h2>
            {users.map((user) => (
              <User key={user.id} {...user} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default UsersMenu;
