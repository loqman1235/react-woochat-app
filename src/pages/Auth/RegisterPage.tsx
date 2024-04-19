import { Input } from "@/components/shared/Input";

const RegisterPage = () => {
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center gap-5 bg-background p-5">
      {/* REGISTER CONTAINER   */}
      <div className="w-full bg-foreground p-5 shadow-2xl md:w-[440px]">
        <h2 className="mb-5 text-2xl font-semibold text-text-foreground">
          Register
        </h2>

        {/* REGISTER FORM  */}
        <form className="flex flex-col gap-5">
          <Input
            name="username"
            id="username"
            placeholder="Username"
            type="text"
          />
          <Input name="email" id="email" placeholder="Email" type="email" />

          <Input
            name="password"
            id="password"
            placeholder="Password"
            type="password"
          />
          <button className="w-full rounded-md bg-primary p-3 font-bold text-white transition duration-300 hover:bg-primary-hover">
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
