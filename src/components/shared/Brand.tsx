import { Link } from "react-router-dom";

const Brand = () => {
  return (
    <Link
      to="/"
      className="select-none font-kaushan text-xl font-extrabold tracking-tight text-text-foreground md:text-2xl"
    >
      Woo<span className="text-primary">chat</span>
    </Link>
  );
};

export default Brand;
