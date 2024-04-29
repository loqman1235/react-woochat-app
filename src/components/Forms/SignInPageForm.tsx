import { Link } from "react-router-dom";
import { FormField } from "../shared/FormField";
import { z } from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Button from "../shared/Button";

const loginSchema = z.object({
  username: z.string().min(1, { message: "Username is required" }),
  password: z.string().min(1, { message: "Password is required" }),
});

type LoginForm = z.infer<typeof loginSchema>;

const SignInPageForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit: SubmitHandler<LoginForm> = (data) => {
    console.log("submit");
    console.log(data);
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
