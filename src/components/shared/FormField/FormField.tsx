import { FieldValues, UseFormRegister } from "react-hook-form";

interface FormFieldProps {
  type: "text" | "email" | "password" | "date";
  label: string;
  name: string;
  id: string;
  placeholder: string;
  className?: string;
  register: UseFormRegister<FieldValues>;
  isRequired?: boolean;
}

const FormField = ({
  label,
  type,
  name,
  id,
  placeholder,
  className = "",
  isRequired = false,
  register,
}: FormFieldProps) => {
  return (
    <div className="relative space-y-1">
      <label htmlFor={id} className="text-sm text-text-foreground">
        {label}{" "}
        {isRequired ? <span className="text-xs text-danger">*</span> : null}
      </label>
      <input
        type={type}
        id={id}
        placeholder={placeholder}
        className={`w-full rounded-md border border-border bg-background px-3 py-2 text-text-foreground outline-none placeholder:text-text-muted ${className}`}
        {...register(name)}
      />
    </div>
  );
};

export default FormField;
