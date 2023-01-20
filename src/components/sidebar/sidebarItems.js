import {
  SUPER_ADMIN_ROLE,
  ADMIN_ROLE,
  VIEWER_ROLE,
} from "../../middlewares/permissions.js";
import {
  DashboardOutlined,
  UserOutlined,
  UsergroupAddOutlined,
  BookOutlined,
} from "@ant-design/icons";

import i18n from "../../locales/i18n.js";
import React from "react";

export default [
  {
    key: "dashboard",
    icon: React.createElement(DashboardOutlined),
    label: i18n.t("sidebar.dashboard"),
    path: "/dashboard",
    roles: [SUPER_ADMIN_ROLE, ADMIN_ROLE],
  },
  {
    key: "userMenu",
    icon: React.createElement(DashboardOutlined),
    label: i18n.t("sidebar.users"),
    type: "group",
    children: [
      {
        key: "users",
        icon: React.createElement(UserOutlined),
        label: i18n.t("sidebar.users"),
        path: "/users",
        roles: [SUPER_ADMIN_ROLE, ADMIN_ROLE],
      },
      {
        key: "userGroups",
        icon: React.createElement(UsergroupAddOutlined),
        label: i18n.t("sidebar.userGroups"),
        path: "/userGroups",
        roles: [SUPER_ADMIN_ROLE, ADMIN_ROLE],
      },
      {
        key: "companies",
        icon: React.createElement(BookOutlined),
        label: i18n.t("sidebar.companies"),
        path: "/companies",
        roles: [SUPER_ADMIN_ROLE, ADMIN_ROLE],
      },
    ],
    roles: [SUPER_ADMIN_ROLE, ADMIN_ROLE],
  },
];
