import { SignUpPageForm } from "@/components/Forms";

const RegisterPage = () => {
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center gap-5 bg-background p-5">
      {/* REGISTER CONTAINER   */}
      <div className="w-full rounded-md bg-foreground p-5 shadow-lg md:w-[440px]">
        <h2 className="mb-5 text-2xl font-semibold text-text-foreground">
          Sign Up
        </h2>

        {/* REGISTER FORM  */}
        <SignUpPageForm />
      </div>
    </div>
  );
};

export default RegisterPage;
