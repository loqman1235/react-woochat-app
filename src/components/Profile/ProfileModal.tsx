import { MdCameraAlt, MdClose, MdVerified } from "react-icons/md";
import Avatar from "../shared/Avatar";
import { useEffect, useState } from "react";
import AboutProfile from "./AboutProfile";
import EditProfileForm from "./EditProfileForm";
import LevelForm from "./LevelForm";
import useProfile from "@/hooks/useProfile";
import useAuth from "@/hooks/useAuth";
import api from "@/services/api";
import { getRoleIcon, isUserOnline, setItemToLocalStorage } from "@/utils";
import { toast } from "react-toastify";
import { ClipLoader } from "react-spinners";
import { AxiosError } from "axios";
import ManageRole from "./ManageRole";
import useSocket from "@/hooks/useSocket";
import { User } from "@/types";
import { useTheme } from "@/hooks/useTheme";
// import useFetch from "@/hooks/useFetch";

const ProfileModal = () => {
  const { theme } = useTheme();
  const socket = useSocket();
  const { user, setUser } = useAuth();
  // const { data: userResult, isLoading } = useFetch("/users", user.id);

  const { isProfileOpen, setIsProfileOpen, currentUser, setCurrentUser } =
    useProfile();

  const isOwnProfile = user?.id === currentUser?.id;

  const [isAboutTabActive, setIsAboutTabActive] = useState(true);
  const [isEditProfileTabActive, setIsProfileTabActive] = useState(false);
  const [isLevelsTabActive, setIsLevelsTabActive] = useState(false);
  const [isManageRoleTabActive, setIsManageRoleTabActive] = useState(false);
  const [onlineUsers, setOnlineUsers] = useState<User[]>([]);

  const toggleAboutTab = () => {
    setIsAboutTabActive(true);
    setIsProfileTabActive(false);
    setIsLevelsTabActive(false);
    setIsManageRoleTabActive(false);
  };

  const toggleOptionsTab = () => {
    setIsAboutTabActive(false);
    setIsProfileTabActive(true);
    setIsLevelsTabActive(false);
    setIsManageRoleTabActive(false);
  };

  const toggleLevelsTab = () => {
    setIsAboutTabActive(false);
    setIsProfileTabActive(false);
    setIsLevelsTabActive(true);
    setIsManageRoleTabActive(false);
  };

  const toggleManageRole = () => {
    setIsAboutTabActive(false);
    setIsProfileTabActive(false);
    setIsLevelsTabActive(false);
    setIsManageRoleTabActive(true);
  };

  const [isAvatarUploading, setIsAvatarUploading] = useState(false);
  const [isCoverUploading, setIsCoverUploading] = useState(false);

  const isOnline = currentUser && isUserOnline(onlineUsers, currentUser.id);

  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];

      const formData = new FormData();

      formData.append("avatar", file);

      try {
        setIsAvatarUploading(true);
        const response = await api.put(`/users/${user?.id}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        setIsAvatarUploading(false);

        if (response.status === 200) {
          toast.success("Avatar updated successfully");
          setCurrentUser(response.data.user);
          setUser(response.data.user);
          setItemToLocalStorage("user", JSON.stringify(response.data.user));
        }
      } catch (error) {
        setIsAvatarUploading(false);
        if (error instanceof AxiosError) {
          if (error.response?.data?.details[0]?.message) {
            toast.error(error.response?.data?.details[0]?.message);
          }
        } else {
          toast.error("An error occurred. Please try again later.");
        }

        console.log(error);
      }
    }
  };

  const handleCoverUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const formData = new FormData();

      formData.append("cover", file);

      try {
        setIsCoverUploading(true);
        const response = await api.put(`/users/${user?.id}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        setIsCoverUploading(false);

        if (response.status === 200) {
          toast.success("Cover updated successfully");
          setCurrentUser(response.data.user);
          setUser(response.data.user);
          setItemToLocalStorage("user", JSON.stringify(response.data.user));
        }
      } catch (error) {
        setIsCoverUploading(false);
        if (error instanceof AxiosError) {
          if (error.response?.data?.details[0]?.message) {
            toast.error(error.response?.data?.details[0]?.message);
          }
        } else {
          toast.error("An error occurred. Please try again later.");
        }

        console.log(error);
      }
    }
  };

  useEffect(() => {
    if (isProfileOpen) {
      setIsAboutTabActive(true);
      setIsProfileTabActive(false);
      setIsLevelsTabActive(false);
      setIsManageRoleTabActive(false);
    }
  }, [isProfileOpen]);

  useEffect(() => {
    if (!socket) return;

    const handleOnlineUsers = (users: User[]) => {
      setOnlineUsers(users);
    };

    socket.on("online_users", handleOnlineUsers);

    return () => {
      socket.off("online_users", handleOnlineUsers);
    };
  }, [socket]);

  const activeTabStyles = "bg-secondary !text-text-foreground !font-bold";
  const inactiveTabStyles =
    "flex h-full cursor-pointer items-center px-5 text-text-muted transition duration-300 hover:text-text-foreground font-semibold";

  return (
    // MODAL CONTAINER
    <div
      onClick={() => setIsProfileOpen(false)}
      className={`fixed inset-0 z-50 flex min-h-screen w-full items-center justify-center backdrop-blur-md ${isProfileOpen ? "block" : "hidden"} overflow-y-auto p-2 md:p-5 ${theme === "light" ? "bg-black/50" : "bg-neutral-400/50"}`}
    >
      <div
        className="w-[100%] max-w-[580px] overflow-hidden rounded-xl bg-foreground shadow-lg"
        onClick={(e) => e.stopPropagation()}
      >
        {/* MODAL HEADER */}
        <div>
          <div className="relative h-[200px] w-full bg-secondary before:absolute before:inset-0 before:bg-black before:opacity-70 before:shadow">
            <img
              src={
                currentUser?.cover && currentUser.cover.secure_url
                  ? currentUser.cover.secure_url
                  : "https://picsum.photos/1920/300"
              }
              alt="cover"
              className="h-full w-full object-cover"
            />

            {/* CTAs */}
            <div className="absolute right-4 top-4 flex items-center gap-3">
              {isOwnProfile && (
                <div className="flex gap-5 rounded-full bg-muted p-1 text-lg text-text-foreground opacity-80 shadow md:right-5 md:top-5">
                  {isCoverUploading ? (
                    <ClipLoader
                      color="var(--color-text-foreground)"
                      size={14}
                    />
                  ) : (
                    <label htmlFor="cover" className="cursor-pointer">
                      <input
                        type="file"
                        name="cover"
                        id="cover"
                        hidden
                        onChange={handleCoverUpload}
                      />
                      <MdCameraAlt />
                    </label>
                  )}
                </div>
              )}
              <button
                className="text-2xl text-white"
                onClick={() => setIsProfileOpen(false)}
              >
                <MdClose />
              </button>
            </div>

            {/* AVATAR */}
            <div className="absolute bottom-5 left-2 flex items-end gap-3 md:left-5">
              <div className="relative shadow-md">
                <div className="relative">
                  <Avatar
                    size="4xl"
                    src={
                      currentUser?.avatar && currentUser.avatar.secure_url
                        ? currentUser.avatar.secure_url
                        : "/default_avatar.png"
                    }
                    username={currentUser?.username}
                    gender={currentUser?.gender as "male" | "female"}
                    isBordered
                    rounded={false}
                  />
                  {!isOwnProfile && (
                    <div>
                      {isOnline ? (
                        <span
                          className="absolute bottom-2 right-2 h-3 w-3 animate-pulse rounded-full bg-success"
                          title="Online"
                        ></span>
                      ) : (
                        <span
                          className="absolute bottom-2 right-2 h-3 w-3 rounded-full  bg-danger"
                          title="Offline"
                        ></span>
                      )}
                    </div>
                  )}
                </div>

                {isOwnProfile && (
                  <div className="absolute bottom-2 right-2 z-40 flex gap-5 rounded-full bg-muted p-1 text-lg text-text-foreground opacity-80 shadow">
                    {isAvatarUploading ? (
                      <ClipLoader
                        color="var(--color-text-foreground)"
                        size={14}
                      />
                    ) : (
                      <label htmlFor="avatar" className="cursor-pointer">
                        <input
                          type="file"
                          name="avatar"
                          id="avatar"
                          hidden
                          onChange={handleAvatarUpload}
                        />
                        <span>
                          <MdCameraAlt />
                        </span>
                      </label>
                    )}
                  </div>
                )}
              </div>
              <div>
                <div className="flex items-center gap-1">
                  <h3 className="flex items-center gap-2 text-xl font-extrabold text-white drop-shadow">
                    {isOwnProfile ? user?.username : currentUser?.username}
                    <div className="flex items-center gap-1">
                      {currentUser?.verified && (
                        <span className="text-success" title="Verified">
                          <MdVerified />
                        </span>
                      )}
                      {currentUser && (
                        <span>{getRoleIcon(currentUser.role, "md")}</span>
                      )}
                    </div>
                  </h3>
                </div>
                {/* MOOD */}
                {user?.mood && (
                  <p className="text-base text-white drop-shadow">
                    {isOwnProfile ? user?.mood : currentUser?.mood}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
        {/* MODAL TABS */}
        <ul className="flex h-9 w-full items-center bg-muted">
          <li
            className={`${inactiveTabStyles} ${isAboutTabActive && activeTabStyles}`}
            onClick={toggleAboutTab}
          >
            About
          </li>
          {isOwnProfile && (
            <li
              className={`${inactiveTabStyles} ${isEditProfileTabActive && activeTabStyles}`}
              onClick={toggleOptionsTab}
            >
              Edit
            </li>
          )}
          <li
            className={`${inactiveTabStyles} ${isLevelsTabActive && activeTabStyles}`}
            onClick={toggleLevelsTab}
          >
            Level
          </li>
          {user?.role === "OWNER" && !isOwnProfile && (
            <li
              className={`${inactiveTabStyles} ${isManageRoleTabActive && activeTabStyles}`}
              onClick={toggleManageRole}
            >
              Manage role
            </li>
          )}
        </ul>

        <AboutProfile isOpen={isAboutTabActive} />
        {isOwnProfile && <EditProfileForm isOpen={isEditProfileTabActive} />}
        <LevelForm isOpen={isLevelsTabActive} />
        <ManageRole isOpen={isManageRoleTabActive} />
      </div>
    </div>
  );
};

export default ProfileModal;
