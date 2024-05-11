import { MainMenu } from "@/components/MainMenu";
import RoomCard from "@/components/RoomCard";
import Button from "@/components/shared/Button";
import useAuth from "@/hooks/useAuth";

// Icons
import { MdAdd } from "react-icons/md";
import { Modal } from "@/components/shared/Modal";
import { FormField } from "@/components/shared/FormField";
import { SubmitHandler, useForm } from "react-hook-form";
import { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const MAX_FILE_SIZE = 5 * 1024 * 1024;
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];
const createRoomSchema = z.object({
  name: z.string().min(1, "Name is required").max(50, "Name is too long"),
  description: z.string().max(255, "Description is too long").optional(),
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

const RoomsPage = () => {
  const { user } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CreateRoomForm>({
    resolver: zodResolver(createRoomSchema),
  });
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  // Handle form submission
  const onSubmit: SubmitHandler<CreateRoomForm> = async (data) => {
    console.log(data);
  };

  return (
    <main className="relative top-[48px] flex h-[calc(100vh-48px-48px)] w-full items-center overflow-hidden">
      <MainMenu />

      <div className="h-full w-[calc(100%-var(--main-menu-width))] flex-[3] overflow-y-auto bg-background p-2 py-5 md:p-5">
        <div className="mb-5 flex w-full items-center justify-between">
          <h3 className="text-xl font-semibold text-text-foreground">Rooms</h3>

          {user && user.role === "ADMIN" && (
            <Button variant="primary" type="button" onClick={handleModal}>
              <MdAdd className="text-xl" /> Create
            </Button>
          )}
        </div>
        <div className="grid w-full grid-cols-1 gap-5 md:grid-cols-2 ">
          <RoomCard
            image="https://picsum.photos/200"
            name="main room"
            description="Dive into the latest in technology, share tips, discuss trends, and explore innovations with fellow tech enthusiasts."
            totalMembers={150}
            isPinned
          />
          <RoomCard
            image="https://picsum.photos/200"
            name="global gourmet"
            description="A place for foodies to exchange recipes, discuss cooking techniques, and explore culinary cultures from around the world."
            totalMembers={134}
            isPinned
          />
          <RoomCard
            image="https://picsum.photos/200"
            name="book buds"
            description=" Join book lovers as we discuss our latest reads, share recommendations, and occasionally host author Q&A sessions."
            totalMembers={22}
          />
          <RoomCard
            image="https://picsum.photos/200"
            name="fitness friends"
            description="Whether you’re a gym rat or a yoga newbie, find motivation, workout tips, and health advice in a supportive community."
            totalMembers={20}
          />
        </div>
      </div>

      {/* Create room modal */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-bold text-text-foreground">
            Create room
          </h3>
        </div>
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
            <Button variant="primary" type="submit" isDisabled={isSubmitting}>
              Create
            </Button>
            <Button
              variant="danger"
              type="button"
              onClick={() => setIsModalOpen(false)}
            >
              Cancel
            </Button>
          </div>
        </form>
      </Modal>
    </main>
  );
};

export default RoomsPage;
