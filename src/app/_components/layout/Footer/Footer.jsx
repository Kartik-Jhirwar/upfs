import { Div } from "@jumbo/shared";
import { Button, Typography } from "@mui/material";
import gmLogo from "@assets/images/gmLogo.png";

const Footer = () => {
  return (
    <Div
      sx={{
        py: 2,
        px: { lg: 6, xs: 4 },
        borderTop: 2,
        borderColor: "divider",
        bgcolor: "background.paper",
      }}
    >
      <Div
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant={"body1"} color={"text.primary"}>
          CREATED BY: GM SOLUTIONS © 2025
        </Typography>
        <Div sx={{ display: "flex", alignItems: "center" }}>
        <img
            src={ gmLogo}
            alt="UPFS Logo"
            width={80}
            height={40}
            style={{ verticalAlign: "middle" }}
          />
        </Div>
      </Div>
    </Div>
  );
};

export { Footer };
