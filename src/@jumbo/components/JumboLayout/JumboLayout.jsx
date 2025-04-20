import { Toolbar } from "@mui/material";
import { Div } from "@jumbo/shared";
import { SIDEBAR_STYLES } from "@jumbo/utilities/constants";
import {
  JumboLayoutFooter,
  JumboLayoutHeader,
  JumboLayoutSidebar,
} from "./components";
import { useContentMargin, useHeaderSpaceSx, useJumboLayout } from "./hooks";
import PropTypes from "prop-types";
import { LayoutProps } from "./prop-types";

function JumboLayout(props) {
  const { rootOptions, sidebarOptions, headerOptions, contentOptions } =
    useJumboLayout();

  const headerSpaceSx = useHeaderSpaceSx();
  const contentMargin = useContentMargin();
  return (
    <Div
      sx={{
        display: "flex",
        flex: 1,
        minWidth: 0,
        minHeight: "100%",
        flexDirection: "column",
        ...rootOptions?.sx,
      }}
      className="CmtLayout-root"
    >
      {sidebarOptions?.style === SIDEBAR_STYLES.CLIPPED_UNDER_HEADER && (
        <JumboLayoutHeader>{props.header}</JumboLayoutHeader>
      )}

      <Div
        sx={{
          display: "flex",
          flex: 1,
          minWidth: 0,
          position: "relative",
        }}
        className="CmtLayout-wrapper"
      >
        {props.sidebar && (
          <JumboLayoutSidebar>{props.sidebar}</JumboLayoutSidebar>
        )}
        <Div
          sx={{
            display: "flex",
            minWidth: 0,
            flex: 1,
            flexDirection: "column",
            minHeight: "100%",
            marginLeft: {
              sm: `${contentMargin}px`,
            },
            transition: (theme) => theme.transitions.create(["margin-left"]),
          }}
          className="CmtLayout-main"
        >
          {sidebarOptions?.style !== SIDEBAR_STYLES.CLIPPED_UNDER_HEADER && (
            <JumboLayoutHeader>{props.header}</JumboLayoutHeader>
          )}
          {!headerOptions.hide && headerOptions.fixed && (
            <Toolbar sx={{ ...headerSpaceSx }} />
          )}
          <Div
            sx={{
              display: "flex",
              minWidth: 0,
              flex: 1,
              flexDirection: "column",
              py: 4,
              px: { lg: 6, xs: 4 },
              ...(contentOptions?.sx ?? {}),
            }}
            className="CmtLayout-content"
          >
            {props.children}
          </Div>
          <JumboLayoutFooter>{props.footer}</JumboLayoutFooter>
        </Div>
        {props.rightSidebar && (
          <div>Layout Option</div>
          // <JumboLayoutSidebar>{props.rightSidebar}</JumboLayoutSidebar>
        )}
      </Div>
    </Div>
  );
}

export { JumboLayout };

JumboLayout.propTypes = LayoutProps;
