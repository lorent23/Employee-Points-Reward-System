import {
  VIEWER_ROLE,
  ADMIN_ROLE,
} from "../../middlewares/permissions.js";
import {
  DashboardOutlined,
  UserOutlined,
} from "@ant-design/icons";

import i18n from "../../locales/i18n.js";
import React from "react";

export default [
  {
    key: "userMenu",
    icon: React.createElement(UserOutlined),
    label: i18n.t("sidebar.users"),
    type: "group",
    children: [
      {
        key: "users",
        icon: React.createElement(UserOutlined),
        label: i18n.t("sidebar.users"),
        path: "/users",
        roles: [VIEWER_ROLE, ADMIN_ROLE],
      },
    ],
    roles: [VIEWER_ROLE, ADMIN_ROLE],
  },
];
