import { Link } from "react-router-dom";
import { FormField } from "../shared/FormField";
import { z } from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Button from "../shared/Button";
import useAuth from "@/hooks/useAuth";

const loginSchema = z.object({
  email: z.string().min(1, { message: "Email is required" }),
  password: z.string().min(1, { message: "Password is required" }),
});

type LoginForm = z.infer<typeof loginSchema>;

const SignInPageForm = () => {
  const { signinUser } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit: SubmitHandler<LoginForm> = async (data) => {
    try {
      console.log(data.email);
      await signinUser({ email: data.email, password: data.password });
    } catch (error) {
      console.log(`Error signing in: ${error}`);
    }
  };

  return (
    <form className="flex flex-col gap-5" onSubmit={handleSubmit(onSubmit)}>
      <FormField
        name="email"
        label="Email"
        id="email"
        placeholder="Email"
        type="email"
        register={register}
        error={errors.email?.message}
      />

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
        <p>Don't have an account?</p>{" "}
        <Link className="text-primary hover:underline" to="/sign-up">
          Sign Up
        </Link>
      </div>

      <Button type="submit" variant="primary" className="w-full">
        Sign In
      </Button>
    </form>
  );
};

export default SignInPageForm;
