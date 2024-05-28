import { FormField } from "@/components/shared/FormField";
import { z } from "zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  SelectInput,
  SelectInputOption,
} from "@/components/shared/SelectInput";
import { Link } from "react-router-dom";
import Button from "../shared/Button";
import api from "@/services/api";
import { AxiosError } from "axios";
import { debugLog } from "@/utils";
import { toast } from "react-toastify";

const registerSchema = z.object({
  username: z
    .string()
    .trim()
    .min(1, { message: "Username is required" })
    .min(3, { message: "Username must be at least 3 characters" })
    .max(20, { message: " Username can't be longer than 20 characters" }),
  email: z.string().trim().min(1, { message: "Email is required" }).email(),
  gender: z.enum(["male", "female"]).default("male"),
  password: z
    .string()
    .min(1, { message: "Password is required" })
    .min(5, { message: "Password must be at least 5 characters" }),
});

export type RegisterFormData = z.infer<typeof registerSchema>;

const SignUpPageForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit: SubmitHandler<RegisterFormData> = async (data) => {
    try {
      const response = await api.post("/auth/signup", data);

      if (response.status === 201) {
        debugLog(response.data);
        reset();
        toast.success(response.data.message);
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        setError("email", {
          type: "custom",
          message: error.response?.data?.details[0]?.message,
        });
      }
      debugLog(error);
    }
  };
  return (
    <form className="flex flex-col gap-5" onSubmit={handleSubmit(onSubmit)}>
      <FormField
        name="username"
        label="Username"
        id="username"
        placeholder="Username"
        type="text"
        register={register}
        error={errors.username?.message}
      />
      <FormField
        name="email"
        label="Email"
        id="email"
        placeholder="Email"
        type="email"
        register={register}
        error={errors.email?.message}
      />

      {/*GENDER */}
      <SelectInput
        id="gender"
        label="Gender"
        register={register}
        name="gender"
        error={errors.gender?.message}
      >
        <SelectInputOption value="male" />
        <SelectInputOption value="female" />
      </SelectInput>

      <FormField
        name="password"
        label="Password"
        id="password"
        placeholder="Password"
        type="password"
        register={register}
        error={errors.password?.message}
      />

      <div className="flex items-center gap-1 text-text-muted">
        <p>Have an account?</p>{" "}
        <Link className="font-bold text-primary hover:underline" to="/sign-in">
          Sign In
        </Link>
      </div>

      <Button
        type="submit"
        variant="primary"
        className="w-full"
        isDisabled={isSubmitting}
        size="lg"
      >
        Sign Up
      </Button>
    </form>
  );
};

export default SignUpPageForm;
