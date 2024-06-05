import { FormField } from "../shared/FormField";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import Button from "../shared/Button";
import { ClipLoader } from "react-spinners";
import api from "@/services/api";
import { AxiosError } from "axios";
import { debugLog } from "@/utils";
import { toast } from "react-toastify";
// import useRoom from "@/hooks/useRoom";
// import { Room } from "@/types";
import useSocket from "@/hooks/useSocket";
// import useAuth from "@/hooks/useAuth";
import { MdEdit } from "react-icons/md";
import useRoom from "@/hooks/useRoom";
import { useEffect } from "react";

const MAX_FILE_SIZE = 5 * 1024 * 1024;
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];
const updateRoomSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Name is too short")
    .max(50, "Name is too long")
    .optional(),
  description: z
    .string()
    .trim()
    .max(255, "Description is too long")
    .nullable()
    .optional(),
  image: z
    .instanceof(FileList)
    .refine((files) => {
      if (files.length > 0) {
        const file = files[0];
        if (file.size > MAX_FILE_SIZE) return false;
      }
      return true;
    }, "Image is too large")
    .refine((files) => {
      if (files.length > 0) {
        const file = files[0];
        if (!ACCEPTED_IMAGE_TYPES.includes(file.type)) return false;
      }
      return true;
    }, "Only jpeg, jpg, png, and webp images are allowed")
    .optional(),
});

type UpdateRoomForm = z.infer<typeof updateRoomSchema>;

interface UpdateRoomFormProps {
  roomId: string;
  name: string;
  description: string;
  handleCloseModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const UpdateRoomForm = ({
  handleCloseModal,
  roomId,
  name,
  description,
}: UpdateRoomFormProps) => {
  const { setRooms } = useRoom();
  const socket = useSocket();
  //   const { user } = useAuth();
  // const { addRoom } = useRoom();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
    setError,
    setValue,
  } = useForm<UpdateRoomForm>({
    resolver: zodResolver(updateRoomSchema),
    defaultValues: {
      name,
      description,
    },
  });

  useEffect(() => {
    setValue("name", name);
    setValue("description", description);
  }, [description, name, setValue]);

  // Handle form submission
  const onSubmit: SubmitHandler<UpdateRoomForm> = async (data) => {
    const formData = new FormData();
    if (data.name) formData.append("name", data.name);
    if (data.description) formData.append("description", data.description);
    if (data.image && data.image.length > 0) {
      formData.append("image", data.image[0]);
    }
    try {
      const response = await api.put(`/rooms/${roomId}`, formData);
      if (response.status === 200) {
        if (response.data.room) {
          socket?.emit("update_room", {
            room: response.data.room,
          });
          setRooms((prevRooms) =>
            prevRooms.map((room) =>
              room.id === roomId ? response.data.room : room,
            ),
          );
          console.log("Room Updated", response.data);
        }
        reset();
        toast.success("Room updated successfully");
        handleCloseModal(false);
        debugLog(response.data);
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response?.data && error.response?.data.details) {
          setError(error.response?.data.details[0].field, {
            message: error.response?.data.details[0].message,
          });
          toast.error(error.response?.data.details[0].message);
        } else {
          debugLog(error.response?.data);
        }
      }
      debugLog(error);
    }
  };

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
      <FormField
        id="name"
        label="Name"
        name="name"
        placeholder="Enter room name"
        type="text"
        register={register}
        error={errors.name?.message}
      />

      <FormField
        id="image"
        label="Image"
        name="image"
        type="file"
        register={register}
        error={errors.image?.message}
      />

      <FormField
        id="description"
        label="Description"
        name="description"
        placeholder="Enter room description"
        type="textarea"
        register={register}
        error={errors.description?.message}
      />
      <div className="flex gap-2">
        <Button variant="success" type="submit" isDisabled={isSubmitting}>
          {isSubmitting ? (
            <span className="flex items-center gap-2">
              <ClipLoader size={16} color="rgba(255, 255, 255, 0.8)" />{" "}
              Editing...
            </span>
          ) : (
            <span className="flex items-center gap-2">
              <span className="text-lg">
                <MdEdit />
              </span>
              Edit
            </span>
          )}
        </Button>
      </div>
    </form>
  );
};

export default UpdateRoomForm;
