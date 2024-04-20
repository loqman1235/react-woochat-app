import { Input } from "@/components/shared/Input";
import { Link } from "react-router-dom";

const LoginPage = () => {
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center gap-5 bg-background p-5">
      {/* LOGIN CONTAINER   */}
      <div className="w-full rounded-md bg-foreground p-5 shadow-lg md:w-[440px]">
        <h2 className="mb-5 text-2xl font-semibold text-text-foreground">
          Sign In
        </h2>

        {/* LOGIN FORM  */}
        <form className="flex flex-col gap-5">
          <Input
            label="Email"
            name="email"
            id="email"
            placeholder="Email"
            type="email"
          />

          <Input
            label="Password"
            name="password"
            id="password"
            placeholder="Password"
            type="password"
          />

          <div className="flex items-center gap-2">
            <p>Don't have an account?</p>{" "}
            <Link className="text-primary" to="/sign-up">
              Sign Up
            </Link>
          </div>

          <button className="w-full rounded-md bg-primary p-3 font-bold text-white transition duration-300 hover:bg-primary-hover">
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
