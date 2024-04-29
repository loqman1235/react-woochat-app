import { FieldValues, UseFormRegister } from "react-hook-form";
import { MdExpandMore } from "react-icons/md";

interface SelectInputProps<TFieldValues extends FieldValues = FieldValues> {
  label: string;
  name: keyof TFieldValues;
  id: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  register: UseFormRegister<any>;
  error?: string | undefined;
  children: React.ReactNode;
}
const SelectInput = ({
  label,
  id,
  children,
  name,
  register,
  error,
}: SelectInputProps) => {
  return (
    <div className="relative space-y-1">
      <label htmlFor={id} className="text-sm text-text-foreground">
        {label}
      </label>
      <div className="relative">
        <select
          id={id}
          className="w-full appearance-none rounded-md border border-border bg-background px-3 py-2 text-text-foreground outline-none placeholder:text-text-muted"
          {...register(name)}
        >
          {children}
        </select>

        <span className="pointer-events-none absolute right-1 top-1/2 -translate-y-1/2 text-2xl text-text-muted">
          <MdExpandMore />
        </span>

        {error && <p className="text-sm text-danger">{error}</p>}
      </div>
    </div>
  );
};

export default SelectInput;
