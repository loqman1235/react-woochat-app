import Button from "../shared/Button";
import { FormField } from "../shared/FormField";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "react-toastify";
import { setItemToLocalStorage } from "@/utils";
import api from "@/services/api";

// Hooks
import useProfile from "@/hooks/useProfile";
import useAuth from "@/hooks/useAuth";
import { ClipLoader } from "react-spinners";
interface AboutFormProps {
  isOpen: boolean;
}

const aboutSchema = z.object({
  age: z.coerce.number().nullable().optional(),
  mood: z.string().nullable().optional(),
  about: z.string().nullable().optional(),
});

type AboutForm = z.infer<typeof aboutSchema>;

const AboutForm = ({ isOpen = false }: AboutFormProps) => {
  const { user, setUser } = useAuth();
  // const { data: fetchedUser, isLoading } = useFetch<User>("/users", user?.id);
  const { setCurrentUser } = useProfile();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<AboutForm>({
    resolver: zodResolver(aboutSchema),
    defaultValues: user
      ? { age: user.age, mood: user.mood, about: user.about }
      : {},
  });

  const onSubmit: SubmitHandler<AboutForm> = async (data) => {
    const formData = new FormData();

    if (data.age) {
      formData.append("age", data.age.toString());
    }

    if (data.mood) {
      formData.append("mood", data.mood);
    }

    if (data.about) {
      formData.append("about", data.about);
    }

    try {
      const response = await api.put(`/users/${user?.id}`, formData);

      if (response.status === 200) {
        toast.success("Profile updated successfully");
        setCurrentUser(response.data.user);
        setUser(response.data.user);
        setItemToLocalStorage("user", JSON.stringify(response.data.user));
      }
    } catch (error) {
      toast.error("Error updating profile");
    }
  };

  return (
    <div className={`w-full p-5 ${isOpen ? "block" : "hidden"}`}>
      <form
        className="flex flex-col gap-5 text-text-foreground"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex w-full items-center gap-5">
          <FormField
            label="Age"
            name="age"
            placeholder="Enter your age"
            type="number"
            id="age"
            register={register}
            className="w-1/2"
            error={errors.age?.message}
          />
          <FormField
            label="Mood"
            name="mood"
            placeholder="Enter your mood"
            type="text"
            id="mood"
            className="w-1/2"
            register={register}
            error={errors.mood?.message}
          />
        </div>
        <FormField
          type="textarea"
          label="About"
          name="about"
          id="about"
          placeholder="Enter your about"
          register={register}
          error={errors.about?.message}
        />
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

export default AboutForm;
