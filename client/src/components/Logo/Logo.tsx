import { Link } from "react-router-dom";
import "./Logo.scss";

import { img } from "@/utils/RepairOmgSrc";

const Logo = () => {
  return (
    <Link to={"/"} style={{ width: "auto", height: "auto" }}>
      <div className="logo">
        <img src={img("icons/Logo.svg")} />
      </div>
    </Link>
  );
};

export default Logo;
