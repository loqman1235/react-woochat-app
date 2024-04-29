import { MdSave } from "react-icons/md";
import Button from "../Button";

interface AboutFormProps {
  isOpen: boolean;
}

const AboutForm = ({ isOpen = false }: AboutFormProps) => {
  return (
    <div className={`w-full p-5 ${isOpen ? "block" : "hidden"}`}>
      <form className="flex flex-col gap-5 text-text-foreground">
        <div className="flex w-full items-center gap-5">
          <div className="w-1/2 space-y-1">
            <label htmlFor="age" className="text-sm text-text-foreground">
              Age
            </label>
            <input
              type="number"
              name="age"
              id="age"
              className="w-full rounded-md border border-border bg-background p-2 outline-none placeholder:text-text-muted"
            />
          </div>
          <div className="w-1/2 space-y-1">
            <label htmlFor="gender" className="text-sm text-text-foreground">
              Gender
            </label>
            <select
              name="gender"
              id="gender"
              className="w-full rounded-md border border-border bg-background p-2 outline-none placeholder:text-text-muted"
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>
        </div>
        <div className="w-full space-y-1">
          <label htmlFor="about" className="text-sm text-text-foreground">
            About
          </label>
          <textarea
            name="about"
            id="about"
            className="min-h-[120px] w-full resize-none rounded-md border border-border bg-background p-2 outline-none placeholder:text-text-muted"
          ></textarea>
        </div>
        <Button type="submit" variant="primary">
          <MdSave /> Save
        </Button>
      </form>
    </div>
  );
};

export default AboutForm;
