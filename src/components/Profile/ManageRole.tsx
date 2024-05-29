import useProfile from "@/hooks/useProfile";
import Button from "../shared/Button";
import { ClipLoader } from "react-spinners";
import { useEffect, useState } from "react";
import { Role } from "@/types";
import api from "@/services/api";
import { toast } from "react-toastify";
import { AxiosError } from "axios";
import { createNotification, debugLog, getRoleIcon } from "@/utils";
// import useNotification from "@/hooks/useNotification";
import useSocket from "@/hooks/useSocket";

interface ManageRoleProps {
  isOpen: boolean;
}

const ManageRole = ({ isOpen = false }: ManageRoleProps) => {
  const socket = useSocket();
  // const { createNotification } = useNotification();
  const { currentUser, setCurrentUser } = useProfile();
  const [selectedRole, setSelectedRole] = useState<Role | undefined>(
    currentUser?.role,
  );
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleRoleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedRole(e.target.value as Role);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!currentUser) return;

    try {
      setIsSubmitting(true);
      const response = await api.put(`/users/${currentUser?.id}`, {
        role: selectedRole,
      });
      setIsSubmitting(false);

      if (response.status === 200) {
        const updatedUser = response.data.user;

        setCurrentUser(updatedUser);

        // add notification
        const roleNotification = createNotification(
          "ROLE_UPDATED",
          currentUser.id,
          true,
        );

        await api.post("/notifications", roleNotification);

        socket?.emit("role_notification_send", {
          roleNotification,
          receiver: updatedUser,
        });

        toast.success("Role updated successfully");
      }
    } catch (error) {
      setIsSubmitting(false);
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message);
      }

      debugLog(error);
    }
  };

  useEffect(() => {
    setSelectedRole(currentUser?.role);
  }, [currentUser]);

  return (
    <div className={`w-full p-5 ${isOpen ? "block" : "hidden"}`}>
      <h3 className="mb-5 text-lg font-semibold text-text-foreground">
        Choose a role for "{currentUser?.username}"
      </h3>

      <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-4">
            <input
              type="radio"
              id="admin"
              name="role"
              value="ADMIN"
              className="h-4 w-4 accent-primary"
              checked={selectedRole === "ADMIN"}
              onChange={handleRoleChange}
            />
            <label
              htmlFor="admin"
              className={`flex items-center gap-2 text-text-foreground`}
            >
              {getRoleIcon("ADMIN", "xs")}
              Admin {currentUser?.role === "ADMIN" && "(current)"}
            </label>
          </div>

          <div className="flex items-center gap-4">
            <input
              type="radio"
              id="mod"
              name="role"
              value="MOD"
              className="h-4 w-4 accent-primary"
              checked={selectedRole === "MOD"}
              onChange={handleRoleChange}
            />
            <label
              htmlFor="mod"
              className={`flex items-center gap-2 text-text-foreground`}
            >
              {getRoleIcon("MOD", "xs")} Moderator{" "}
              {currentUser?.role === "MOD" && "(current)"}
            </label>
          </div>

          <div className="flex items-center gap-4">
            <input
              type="radio"
              id="user"
              name="role"
              value="USER"
              className="h-4 w-4 accent-primary"
              checked={selectedRole === "USER"}
              onChange={handleRoleChange}
            />
            <label
              htmlFor="user"
              className={`flex items-center gap-2 text-text-foreground`}
            >
              {getRoleIcon("USER", "xs")}
              User {currentUser?.role === "USER" && "(current)"}
            </label>
          </div>
        </div>

        <Button variant="primary" type="submit" isDisabled={isSubmitting}>
          {isSubmitting ? (
            <span className="flex items-center gap-2">
              <ClipLoader size={16} color="rgba(255, 255, 255, 0.8)" />{" "}
              Updating...
            </span>
          ) : (
            "Update"
          )}
        </Button>
      </form>
    </div>
  );
};

export default ManageRole;
