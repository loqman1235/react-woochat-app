import SignInPageForm from "@/components/Forms/SignInPageForm";

const LoginPage = () => {
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center gap-5 bg-background p-5">
      {/* LOGIN CONTAINER   */}
      <div className="w-full rounded-md bg-foreground p-5 shadow-lg md:w-[440px]">
        <h2 className="mb-5 text-2xl font-semibold text-text-foreground">
          Sign In
        </h2>

        {/* LOGIN FORM  */}
        <SignInPageForm />
      </div>
    </div>
  );
};

export default LoginPage;
