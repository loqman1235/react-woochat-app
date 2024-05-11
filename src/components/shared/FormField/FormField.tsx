import { useState } from "react";
import { FieldValues, UseFormRegister } from "react-hook-form";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";

interface FormFieldProps<TFieldValues extends FieldValues = FieldValues> {
  type: "text" | "email" | "password" | "date" | "number" | "textarea" | "file";
  label: string;
  name: keyof TFieldValues;
  id: string;
  placeholder?: string;
  className?: string;
  required?: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  register: UseFormRegister<any>;
  error?: string | undefined;
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
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => setShowPassword((prev) => !prev);

  return (
    <div className={`relative space-y-1 ${className}`}>
      <label htmlFor={id} className="text-sm text-text-foreground">
        {label}{" "}
        {required ? <span className="text-xs text-danger">*</span> : null}
      </label>
      {type !== "textarea" && (
        <div className="relative">
          <input
            type={type === "password" && showPassword ? "text" : type}
            id={id}
            placeholder={placeholder || ""}
            className={`w-full rounded-md border bg-background px-3 py-2 text-text-foreground outline-none placeholder:text-text-muted  ${error ? "border-danger" : "border-border"}`}
            required={required}
            autoComplete="off"
            {...register(name)}
          />
          {type === "password" && (
            <button
              type="button"
              className="absolute right-2 top-1/2 -translate-y-1/2 text-text-muted"
              onClick={(e) => {
                e.preventDefault();
                toggleShowPassword();
              }}
            >
              {showPassword ? (
                <span>
                  <MdVisibilityOff />
                </span>
              ) : (
                <span>
                  <MdVisibility />
                </span>
              )}
            </button>
          )}
        </div>
      )}
      {type === "textarea" && (
        <textarea
          className={`w-full rounded-md border bg-background px-3 py-2 text-text-foreground outline-none placeholder:text-text-muted  ${error ? "border-danger" : "border-border"}`}
          {...register(name)}
          id={id}
          placeholder={placeholder || ""}
          autoComplete="off"
          required={required}
          rows={5}
        />
      )}
      {error && <p className="text-xs text-danger">{error}</p>}
    </div>
  );
};

export default FormField;
