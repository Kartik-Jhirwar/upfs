import { useTranslation } from "react-i18next";

export function getMenus() {
  const { t } = useTranslation();
  return [
    {
      label: t("sidebar.menu.sample"),
      children: [
        {
          path: "/upfs/dashboards",
          label: t("sidebar.menuItem.home"),
          icon: "sample",
        },
        {
          path: "/upfs/dashboards/fire-complaint",
          label: t("sidebar.menuItem.sample"),
          icon: "sample",
        },
        
      ],
    },
  ];
}
