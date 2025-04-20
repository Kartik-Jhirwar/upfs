import { Div, Link } from "@jumbo/shared";
import PropTypes from "prop-types";
import upfsLogo from "@assets/images/upfsLogo.jpg"

const Logo = ({ mini = false, mode = "light", sx }) => {
  return (
    <Div sx={{ display: "inline-flex", ...sx }}>
      <Link to={"/dashboards"}>
        {!mini ? (
          <img
            src={mode === "light" ? upfsLogo : upfsLogo}
            alt="UPFS Logo"
            width="100%"
            height={70}
            style={{ verticalAlign: "middle" }}
          />
        ) : (
          <img
             src={mode === "light" ? upfsLogo : upfsLogo}
            alt="UPFS Logo"
            width={35}
            height={35}
            style={{ verticalAlign: "middle" }}
          />
        )}
      </Link>
    </Div>
  );
};

export { Logo };

Logo.propTypes = {
  mini: PropTypes.bool,
  mode: PropTypes.oneOf(["light", "semi-dark", "dark"]).isRequired,
  sx: PropTypes.object,
};
