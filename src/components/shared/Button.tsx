interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  type: "button" | "submit";
  variant: "primary" | "success" | "danger";
  className?: string;
  isDisabled?: boolean;
  children: React.ReactNode;
}

const Button = ({ type, variant, children, isDisabled }: ButtonProps) => {
  const primaryBtnStyles = "bg-primary text-white hover:bg-primary-hover";
  const successBtnStyle = "bg-success text-white hover:bg-success-hover";
  const dangerBtnStyle = "bg-danger text-white hover:bg-danger-hover";

  return (
    <button
      disabled={isDisabled}
      type={type}
      className={`w-full rounded-md py-2 font-bold transition duration-300 disabled:cursor-not-allowed disabled:opacity-50 ${variant === "primary" ? primaryBtnStyles : variant === "success" ? successBtnStyle : dangerBtnStyle}`}
    >
      {children}
    </button>
  );
};

export default Button;
