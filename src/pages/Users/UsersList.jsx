import React, { useState } from "react";
import UserService from "../../services/UserService.js";
import { useQuery } from "react-query";
import { Button, Table } from "antd";
import { useTranslation } from "react-i18next";
import cn from "classnames";
import { useLocation } from "react-router-dom";

const UsersList = (props) => {
  const [filters, setFilters] = useState({});
  const location = useLocation();
  location.state = { title: "Users" };

  const {
    data: { data: users, meta: metadata },
  } = useQuery(["users", filters], UserService.list);

  const { t } = useTranslation();

  const columns = [
    {
      title: t("common.name"),
      dataIndex: "name",
      key: "name",
    },
    {
      title: t("common.email"),
      dataIndex: "email",
      key: "email",
    },
    {
      title: t("common.role"),
      dataIndex: "role",
      key: "role",
      render: (role) => <span>{role.name}</span>,
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <div className={cn("")}>
          <Button>Edit</Button>
          <Button>Delete</Button>
        </div>
      ),
    },
  ];

  return <Table dataSource={users} columns={columns} rowKey={"id"} />;
};

export default UsersList;
