import { FormField } from "@/components/shared/FormField";
import { useForm, SubmitHandler } from "react-hook-form";
import { Link } from "react-router-dom";
import { z } from "zod";
import { MdExpandMore } from "react-icons/md";
import { zodResolver } from "@hookform/resolvers/zod";

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

const RegisterPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit: SubmitHandler<RegisterFormData> = (data) => {
    console.log("submit");
    console.log(data);
  };

  return (
    <div className="flex h-screen w-full flex-col items-center justify-center gap-5 bg-background p-5">
      {/* REGISTER CONTAINER   */}
      <div className="w-full rounded-md bg-foreground p-5 shadow-lg md:w-[440px]">
        <h2 className="mb-5 text-2xl font-semibold text-text-foreground">
          Sign Up
        </h2>

        {/* REGISTER FORM  */}
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
          <div className="relative space-y-1">
            <label htmlFor="gender" className="text-sm text-text-foreground">
              Gender
            </label>
            <div className="relative">
              <select
                id="gender"
                className="w-full appearance-none rounded-md border border-border bg-background px-3 py-2 text-text-foreground outline-none placeholder:text-text-muted"
                {...register("gender")}
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>

              <span className="absolute right-2 top-1/2 -translate-y-1/2 text-2xl text-text-muted">
                <MdExpandMore />
              </span>
            </div>
          </div>

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
            <p>Have an account?</p>{" "}
            <Link className="text-primary" to="/sign-in">
              Sign In
            </Link>
          </div>

          <button className="w-full rounded-md bg-primary p-2 font-bold text-white transition duration-300 hover:bg-primary-hover">
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
