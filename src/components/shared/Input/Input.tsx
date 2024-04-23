interface InputProps {
  type: "text" | "email" | "password" | "date";
  label: string;
  name: string;
  id: string;
  placeholder: string;
  className?: string;
}

const Input = ({
  label,
  type,
  name,
  id,
  placeholder,
  className = "",
}: InputProps) => {
  return (
    <div className="relative space-y-1">
      <label htmlFor={id} className="text-sm text-text-foreground">
        {label}
      </label>
      <input
        type={type}
        name={name}
        id={id}
        placeholder={placeholder}
        className={`w-full rounded-md border border-border bg-background p-2 outline-none placeholder:text-text-muted ${className}`}
      />
    </div>
  );
};

export default Input;
