import { FieldValues, UseFormRegister } from "react-hook-form";

interface FormFieldProps<TFieldValues extends FieldValues = FieldValues> {
  type: "text" | "email" | "password" | "date";
  label: string;
  name: keyof TFieldValues;
  id: string;
  placeholder: string;
  className?: string;
  required?: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  register: UseFormRegister<any>;
  error: string | undefined;
}
const FormField = ({
  label,
  type,
  name,
  id,
  placeholder,
  className = "",
  required = false,
  register,
  error,
}: FormFieldProps) => {
  return (
    <div className="relative space-y-1">
      <label htmlFor={id} className="text-sm text-text-foreground">
        {label}{" "}
        {required ? <span className="text-xs text-danger">*</span> : null}
      </label>
      <input
        type={type}
        id={id}
        placeholder={placeholder}
        className={`w-full rounded-md border border-border bg-background px-3 py-2 text-text-foreground outline-none placeholder:text-text-muted ${className}`}
        required={required}
        autoComplete="off"
        {...register(name)}
      />
      {error && <p className="text-xs text-danger">{error}</p>}
    </div>
  );
};

export default FormField;
