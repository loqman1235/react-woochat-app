import { Link } from "react-router-dom";
import { FormField } from "../shared/FormField";
import { z } from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

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

      <div className="flex items-center gap-1 text-sm text-text-muted">
        <p>Don't have an account?</p>{" "}
        <Link className="text-primary" to="/sign-up">
          Sign Up
        </Link>
      </div>

      <button className="w-full rounded-md bg-primary p-3 font-bold text-white transition duration-300 hover:bg-primary-hover">
        Sign In
      </button>
    </form>
  );
};

export default SignInPageForm;
