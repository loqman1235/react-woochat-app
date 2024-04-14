import { useTheme } from "@/hooks/useTheme";
import { MdDarkMode, MdLightMode } from "react-icons/md";

const ThemToggleSwitch = () => {
  // const [isChecked, setIsChecked] = useState(false);
  const { theme, toggleTheme } = useTheme();

  console.log(theme, "Current theme");
  return (
    <div
      className={`relative h-4 w-10 overflow-hidden rounded-full ${theme === "light" ? "bg-sky-500" : "bg-muted"}`}
    >
      <input
        type="checkbox"
        id="toggle-theme"
        className="peer absolute left-1/2 top-1/2 w-full -translate-x-1/2 -translate-y-1/2 cursor-pointer opacity-0"
        checked={theme === "light"}
        onChange={() => toggleTheme()}
      />
      <label
        htmlFor="toggle-theme"
        className="absolute top-1/2 z-20 h-4 w-4 -translate-y-1/2 transform cursor-pointer rounded-full bg-white shadow-md transition-transform duration-300 ease-in-out peer-checked:right-0"
      ></label>

      <span className="pointer-events-none absolute right-0.5 top-1/2 -translate-y-1/2 text-sm text-white">
        <MdDarkMode />
      </span>

      <span className="pointer-events-none absolute left-0.5 top-1/2 -translate-y-1/2 text-sm peer-checked:text-warning">
        <MdLightMode />
      </span>
    </div>
  );
};

export default ThemToggleSwitch;
