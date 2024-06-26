import { Link } from "react-router-dom";
import { FormField } from "../shared/FormField";
import { z } from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Button from "../shared/Button";
import useAuth from "@/hooks/useAuth";
import { debugLog } from "@/utils";

const loginSchema = z.object({
  email: z.string().min(1, { message: "Email is required" }),
  password: z.string().min(1, { message: "Password is required" }),
});

type LoginForm = z.infer<typeof loginSchema>;

const SignInPageForm = () => {
  const { signinUser, error } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit: SubmitHandler<LoginForm> = async (data) => {
    try {
      await signinUser({ email: data.email, password: data.password });
    } catch (error) {
      debugLog(`Error signing in: ${error}`);
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

      <div>
        <FormField
          name="password"
          label="Password"
          id="password"
          placeholder="Password"
          type="password"
          register={register}
          error={errors.password?.message}
        />
        {error && <p className="mt-2 text-xs text-danger">{error}</p>}
      </div>

      <div className="flex items-center gap-1 text-text-muted">
        <p>Don't have an account?</p>{" "}
        <Link className="font-bold text-primary hover:underline" to="/sign-up">
          Sign Up
        </Link>
      </div>

      <Button type="submit" variant="primary" className="w-full" size="lg">
        Sign In
      </Button>
    </form>
  );
};

export default SignInPageForm;
