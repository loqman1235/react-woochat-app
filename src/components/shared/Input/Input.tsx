interface InputProps {
  type: "text" | "email" | "password";
  name: string;
  id: string;
  placeholder: string;
  className?: string;
}

const Input = ({ type, name, id, placeholder, className = "" }: InputProps) => {
  return (
    <div className="relative space-y-1">
      <label htmlFor={id} className="text-sm capitalize text-text-muted">
        {name}
      </label>
      <input
        type={type}
        name={name}
        id={id}
        placeholder={placeholder}
        className={`w-full rounded-md border border-border bg-background p-3 outline-none placeholder:text-text-muted ${className}`}
      />
    </div>
  );
};

export default Input;
