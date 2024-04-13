import {
  MdClose,
  MdPeopleAlt,
  MdPersonAdd,
  MdHome,
  MdSearch,
} from "react-icons/md";
import User from "./User";

const UsersMenu = () => {
  return (
    <div className="fixed right-0 top-12 h-[calc(100vh-48px)] w-[var(--users-area-width)] border-l border-l-border bg-foreground">
      {/* USERS MENU HEADER  */}
      <div className="flex h-10 w-full items-center justify-between border-b border-b-border text-2xl">
        <button className="h-full px-5">
          <MdClose />
        </button>

        <div className="flex h-full flex-[1] justify-end gap-5 pr-5 text-text-muted">
          <button className="text-text-foreground">
            <MdPeopleAlt />
          </button>

          <button>
            <MdPersonAdd />
          </button>

          <button>
            <MdHome />
          </button>

          <button>
            <MdSearch />
          </button>
        </div>
      </div>

      {/* ROOM NAME */}
      <div className="flex items-center gap-2 px-5 py-2">
        <h5 className="font-bold text-primary">Main Room</h5>
        <span className="rounded-full bg-primary px-2 py-px text-xs font-bold text-text-background">
          122
        </span>
      </div>
      <div className="h-[calc(100vh-120px)] overflow-y-auto pb-5">
        <User
          username="axeldjefafla"
          avatar="https://i.pravatar.cc/300"
          role="admin"
          gender="male"
          mood="I'm the king here"
          country="US"
        />
        <User
          username="JaneDoe"
          avatar="https://i.pravatar.cc/300"
          role="mod"
          gender="female"
          mood="Doing stuff"
          country="DZ"
        />

        <User
          username="thedude"
          avatar="https://i.pravatar.cc/300"
          role="premium"
          gender="male"
          mood="Doing stuff"
          country="FR"
        />

        <User
          username="thedude"
          avatar="https://i.pravatar.cc/300"
          role="premium"
          gender="male"
          mood="Doing stuff"
          country="CA"
        />

        <User
          username="thedude"
          avatar="https://i.pravatar.cc/300"
          role="premium"
          gender="male"
          mood="Doing stuff"
          country="US"
        />

        <User
          username="Way007"
          avatar="https://i.pravatar.cc/300"
          role="user"
          gender="male"
          mood="Doing stuff"
          country="US"
        />

        <User
          username="Way007"
          avatar="https://i.pravatar.cc/300"
          role="user"
          gender="male"
          mood="Doing stuff"
          country="US"
        />

        <User
          username="Way007"
          avatar="https://i.pravatar.cc/300"
          role="user"
          gender="male"
          mood="Doing stuff"
          country="US"
        />

        <User
          username="Way007"
          avatar="https://i.pravatar.cc/300"
          role="user"
          gender="male"
          mood="Doing stuff"
          country="US"
        />

        <User
          username="Way007"
          avatar="https://i.pravatar.cc/300"
          role="user"
          gender="male"
          mood="Doing stuff"
          country="US"
        />
      </div>
      {/* ONLINE USERS */}
    </div>
  );
};

export default UsersMenu;
