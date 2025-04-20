import { Stack, useMediaQuery, ImageListItem, Button } from "@mui/material";
import React from "react";
import { useJumboTheme } from "@jumbo/components/JumboTheme/hooks";
import { useJumboLayout, useSidebarState } from "@jumbo/components/JumboLayout/hooks";
import { SIDEBAR_STYLES } from "@jumbo/utilities/constants";
import { SidebarToggleButton } from "@app/_components/_core/SidebarToggleButton";
import { Logo } from "@app/_components/_core/Logo";
import { ThemeModeOption } from "./components/ThemeModeOptions";
import { AuthUserPopover } from "@app/_components/popovers/AuthUserPopover";
import { Link } from "@jumbo/shared";
import upfsLogo from "@assets/images/upfsLogo.jpg"

function Header() {
  const { isSidebarStyle } = useSidebarState();
  const { theme } = useJumboTheme();
  const { headerOptions } = useJumboLayout();
  const isBelowLg = useMediaQuery(theme.breakpoints.down(headerOptions?.drawerBreakpoint ?? "xl"));
  const isBelowSm = useMediaQuery(theme.breakpoints.down("sm")); 

  return (
    <React.Fragment>
      <SidebarToggleButton />
      {isSidebarStyle(SIDEBAR_STYLES.CLIPPED_UNDER_HEADER) && !isBelowLg && (
        <Logo sx={{ mr: 3, minWidth: 150 }} mode={theme.type} />
      )}

<ImageListItem sx={{ width: { xs: 100, md: 130 }, height: "auto", mr: 1 }}>
        <Link to={"/upfs/dashboards"}>
        <img
          src={upfsLogo}
          alt="UPFS Logo"
          style={{
            width: "50%",
            height: "10%",
            display: "block",
            filter: "drop-shadow(1px 1px 4px #f5f5f5)", 
          }}
        />
        </Link>
      </ImageListItem>

      <Stack direction="row" alignItems="center" gap={1} sx={{ ml: "auto" }}>
     
        {!isBelowSm && (
          <Button
            variant="contained"
            color="primary"
            size="small"
            sx={{ borderRadius: "1rem", mr: 1 }}
            onClick={() => window.location.reload()}
          >
            Refresh
          </Button>
        )}

     
        {!isBelowSm && <ThemeModeOption />}
        {/* <TranslationPopover /> */}
        {/* <SearchIconButtonOnSmallScreen onClick={handleSearchVisibility} /> */}
        {/* <MessagesPopover /> */}
        {/* <NotificationsPopover /> */}
        

        <AuthUserPopover />
      </Stack>
    </React.Fragment>
  );
}

export { Header };
