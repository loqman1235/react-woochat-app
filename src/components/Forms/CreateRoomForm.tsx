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
import useRoom from "@/hooks/useRoom";
import { Room } from "@/types";

const MAX_FILE_SIZE = 5 * 1024 * 1024;
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];
const createRoomSchema = z.object({
  name: z.string().min(1, "Name is required").max(50, "Name is too long"),
  description: z
    .string()
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
    }, "Only jpeg, jpg, png, and webp images are allowed"),
});

type CreateRoomForm = z.infer<typeof createRoomSchema>;

interface CreateRoomFormProps {
  handleCloseModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const CreateRoomForm = ({ handleCloseModal }: CreateRoomFormProps) => {
  const { addRoom } = useRoom();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<CreateRoomForm>({
    resolver: zodResolver(createRoomSchema),
  });

  // Handle form submission
  const onSubmit: SubmitHandler<CreateRoomForm> = async (data) => {
    const formData = new FormData();
    formData.append("name", data.name);

    if (data.description) formData.append("description", data.description);

    if (data.image && data.image.length > 0) {
      formData.append("image", data.image[0]);
    }

    try {
      const response = await api.post("/rooms", formData);

      if (response.status === 201) {
        if (response.data.room) addRoom(response.data.room as Room);
        reset();
        toast.success("Room created successfully");
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
        required
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
        <Button variant="primary" type="submit" isDisabled={isSubmitting}>
          {isSubmitting ? (
            <span className="flex items-center gap-2">
              <ClipLoader size={16} color="rgba(255, 255, 255, 0.8)" />{" "}
              Creating...
            </span>
          ) : (
            "Create"
          )}
        </Button>
      </div>
    </form>
  );
};

export default CreateRoomForm;
