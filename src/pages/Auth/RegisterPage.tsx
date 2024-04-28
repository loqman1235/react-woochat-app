import { FormField } from "@/components/shared/FormField";
// import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
// import { z } from "zod";

// const registerSchema = z.object({
//   username: z
//     .string()
//     .trim()
//     .min(1, { message: "Username is required" })
//     .max(20, { message: " Username can't be longer than 20 characters" }),
//   email: z.string().trim().email({ message: "Invalid email address" }),
//   dateOfBirth: z
//     .string()
//     .trim()
//     .min(1, { message: "Date of birth is required" }),
// });

const RegisterPage = () => {
  // const { register } = useForm();

  return (
    <div className="flex h-screen w-full flex-col items-center justify-center gap-5 bg-background p-5">
      {/* REGISTER CONTAINER   */}
      <div className="w-full rounded-md bg-foreground p-5 shadow-lg md:w-[440px]">
        <h2 className="mb-5 text-2xl font-semibold text-text-foreground">
          Sign Up
        </h2>

        {/* REGISTER FORM  */}
        <form className="flex flex-col gap-5">
          <FormField
            label="Username"
            name="username"
            id="username"
            placeholder="Username"
            type="text"
          />
          <FormField
            label="Email"
            name="email"
            id="email"
            placeholder="Email"
            type="email"
          />

          {/*GENDER */}
          <div className="relative space-y-1">
            <label htmlFor="gender" className="text-sm text-text-foreground">
              Gender
            </label>
            <select
              name="gender"
              id="gender"
              className="w-full rounded-md border border-border bg-background p-2 text-text-foreground outline-none placeholder:text-text-muted"
            >
              <option value=""></option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>

          <FormField
            label="Password"
            name="password"
            id="password"
            placeholder="Password"
            type="password"
          />

          <div className="flex items-center gap-1 text-sm text-text-muted">
            <p>Have an account?</p>{" "}
            <Link className="text-primary" to="/sign-in">
              Sign In
            </Link>
          </div>

          <button className="w-full rounded-md bg-primary p-3 font-bold text-white transition duration-300 hover:bg-primary-hover">
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
