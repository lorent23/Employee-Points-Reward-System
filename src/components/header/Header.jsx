import React, { useState, useEffect } from "react";
import { Layout, Avatar, Dropdown, Space } from "antd";
import cn from "classnames";
import LogOut from "../logout/LogOut";
import { useLocation } from "react-router-dom";

// Header value(s) should be saved on redux. It would be best if we rendered components instead of simple text
//ToDo implement portals

const Header = () => {
  const [title, setTitle] = useState(null);
  const location = useLocation();

  useEffect(() => {
    setTitle(location.state?.title);
  }, [location]);

  const { Header } = Layout;

  const items = [
    {
      key: "1",
      label: <p>Settings</p>,
    },
    {
      key: "2",
      label: <LogOut />,
    },
    {
      key: "3",
      label: <p>Dashboard</p>,
    },
  ];

  return (
    <div>
      <Header
        className={cn(
          "!pl-4",
          "!bg-white",
          "m-3",
          "mb-0",
          "rounded",
          "flex",
          "justify-between",
          "items-center"
        )}
      >
        <span> {title || "Geko"}</span>
        <Dropdown
          menu={{
            items,
          }}
          placement="bottomRight"
        >
          <Avatar className="ml-5 inline-flex cursor-pointer justify-items-end">
            SuperA
          </Avatar>
        </Dropdown>
      </Header>
    </div>
  );
};

export default Header;
