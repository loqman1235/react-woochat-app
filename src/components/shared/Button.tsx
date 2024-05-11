interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  type: "button" | "submit";
  variant: "primary" | "success" | "danger";
  size?: "sm" | "md" | "lg";
  className?: string;
  isDisabled?: boolean;
  children: React.ReactNode;
}

const Button = ({
  type,
  variant,
  children,
  className,
  size = "md",
  isDisabled,
  ...props
}: ButtonProps) => {
  const primaryBtnStyles = "bg-primary text-white hover:bg-primary-hover";
  const successBtnStyle = "bg-success text-white hover:bg-success-hover";
  const dangerBtnStyle = "bg-danger text-white hover:bg-danger-hover";

  const buttonSize = {
    sm: "px-2 py-1 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg",
  };

  return (
    <button
      type={type}
      className={`flex w-fit items-center justify-center gap-2 rounded-md font-bold transition duration-300 disabled:!cursor-not-allowed disabled:opacity-50 ${variant === "primary" ? primaryBtnStyles : variant === "success" ? successBtnStyle : dangerBtnStyle} ${className} ${buttonSize[size]}`}
      disabled={isDisabled}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
