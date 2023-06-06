import React, { useState, useEffect } from "react";
import { Layout, Avatar, Dropdown, Button } from "antd";
import cn from "classnames";
import {Link} from "react-router-dom";
import LogOut from "../logout/LogOut";
import ForgotPassword from "../forgottenpassword/ForgottenPassword";
import { useLocation } from "react-router-dom";

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
      label: <Button><a href="/forgotten-password">Reset Password</a></Button>,
    },
    {
      key: "2",
      label: <Button><LogOut/></Button>,
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
        <span> {title || "Welcome to First Points System"}</span>
        <Dropdown
          menu={{
            items,
          }}
          placement="bottomRight"
        >
          <Avatar className="ml-5 inline-flex cursor-pointer justify-items-end">
            PROFILE
          </Avatar>
        </Dropdown>
      </Header>
    </div>
  );
};

export default Header;
