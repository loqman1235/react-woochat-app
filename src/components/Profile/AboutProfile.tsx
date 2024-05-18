import useProfile from "@/hooks/useProfile";
import moment from "moment";
import {
  MdCalendarMonth,
  MdEmail,
  MdPublic,
  MdTransgender,
} from "react-icons/md";
import Flag from "react-world-flags";

interface AboutProfileProps {
  isOpen: boolean;
}

const AboutProfile = ({ isOpen = false }: AboutProfileProps) => {
  const { currentUser } = useProfile();

  return (
    <div
      className={`w-full p-5 text-sm text-text-foreground ${isOpen ? "block" : "hidden"}`}
    >
      <ul className="flex items-center border-b border-b-border py-3 last:border-none last:pb-0">
        <li className="flex w-1/2 items-center gap-2 font-medium">
          <span className="text-lg text-text-muted">
            <MdEmail />
          </span>
          Email
        </li>
        <li className="w-1/2">{currentUser?.email || "N/A"}</li>
      </ul>

      <ul className="flex items-center border-b border-b-border py-3 last:border-none last:pb-0">
        <li className="flex w-1/2 items-center gap-2 font-medium">
          <span className="text-lg text-text-muted">
            <MdTransgender />
          </span>
          Gender
        </li>
        <li className="w-1/2 capitalize">{currentUser?.gender || "N/A"}</li>
      </ul>

      <ul className="flex items-center border-b border-b-border py-3 last:border-none last:pb-0">
        <li className="flex w-1/2 items-center gap-2 font-medium">
          <span className="text-lg text-text-muted">
            <MdPublic />
          </span>
          Country
        </li>
        <li className="w-1/2">
          {currentUser?.location && (
            <span>
              <Flag
                code={currentUser.location?.country}
                className="rounded-sm"
                style={{ width: "20px", height: "15px", borderRadius: "4px" }}
                fallback={<span>N/A</span>}
              />
            </span>
          )}
        </li>
      </ul>

      <ul className="flex items-center border-b border-b-border py-2 last:border-none last:pb-0">
        <li className="flex w-1/2 items-center gap-2 font-medium">
          <span className="text-lg text-text-muted">
            <MdCalendarMonth />
          </span>
          Member since
        </li>
        <li className="w-1/2">
          {moment(currentUser?.createdAt).format("yyyy-MM-DD HH:mm A") || "N/A"}
        </li>
      </ul>
    </div>
  );
};

export default AboutProfile;
