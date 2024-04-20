import { Input } from "@/components/shared/Input";
import { Link } from "react-router-dom";

const RegisterPage = () => {
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center gap-5 bg-background p-5">
      {/* REGISTER CONTAINER   */}
      <div className="w-full rounded-md bg-foreground p-5 shadow-lg md:w-[440px]">
        <h2 className="mb-5 text-2xl font-semibold text-text-foreground">
          Sign Up
        </h2>

        {/* REGISTER FORM  */}
        <form className="flex flex-col gap-5">
          <Input
            label="Username"
            name="username"
            id="username"
            placeholder="Username"
            type="text"
          />
          <Input
            label="Email"
            name="email"
            id="email"
            placeholder="Email"
            type="email"
          />

          <Input
            label="Date of birth"
            name="dateOfBirth"
            id="dateOfBirth"
            placeholder="Date of Birth"
            type="date"
          />

          <Input
            label="Password"
            name="password"
            id="password"
            placeholder="Password"
            type="password"
          />

          <div className="flex items-center gap-2">
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
