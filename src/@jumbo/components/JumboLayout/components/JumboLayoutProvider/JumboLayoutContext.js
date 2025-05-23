import {
  SIDEBAR_ANCHOR_POSITIONS,
  SIDEBAR_SCROLL_TYPES,
  SIDEBAR_STYLES,
  SIDEBAR_VARIANTS,
  SIDEBAR_VIEWS,
} from "@jumbo/utilities/constants";
import React from "react";

const defaultLayoutOptions = {
  header: {
    hide: false,
    fixed: true,
  },
  sidebar: {
    open: true,
    hide: false,
    width: 240,
    minWidth: 80,
    variant: SIDEBAR_VARIANTS.PERSISTENT,
    anchor: SIDEBAR_ANCHOR_POSITIONS.LEFT,
    scrollType: SIDEBAR_SCROLL_TYPES.FIXED,
    style: SIDEBAR_STYLES.FULL_HEIGHT,
    view: SIDEBAR_VIEWS.FULL,
    drawer: true,
  },
  footer: {
    hide: false,
  },
  root: {},
  content: {},
};

const defaultLayoutContext = {
  layoutOptions: defaultLayoutOptions,
  headerOptions: defaultLayoutOptions.header,
  sidebarOptions: defaultLayoutOptions.sidebar,
  footerOptions: defaultLayoutOptions.footer,
  rootOptions: defaultLayoutOptions.root,
  contentOptions: defaultLayoutOptions.content,
  setSidebarOptions: () => {},
  setRootOptions: () => {},
  setContentOptions: () => {},
  setFooterOptions: () => {},
  setOptions: () => {},
  setHeaderOptions: () => {},
};
const JumboLayoutContext = React.createContext(defaultLayoutContext);

export { JumboLayoutContext, defaultLayoutContext, defaultLayoutOptions };
