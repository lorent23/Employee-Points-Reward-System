import React, {useEffect, useState} from "react";
import { Layout, Menu,} from "antd";
import {
  FundOutlined 
} from "@ant-design/icons";
import sidebarItems from "./sidebarItems.js";
import {useLocation, useNavigate} from "react-router-dom";

const { Sider } = Layout;

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [defaultSelectedKeys, setDefaultSelectedKeys] = useState([]);
  const [collapsed, setCollapsed] = useState(false);

  const [title, setTitle] = useState(null);

  useEffect(() => {
    const path = location.pathname;
    const key = []
    sidebarItems.forEach((parent) => {
      if (parent.path === path) {
        key.push(parent.key);
      }
      else if (!parent.path) {
        parent.children.forEach((child) => {
          if (child.path === path) {
            key.push(parent.key, child.key);
          }
        });
      }
    })
    setDefaultSelectedKeys(key);
  }, [location]);

  const navigateToItem = ({ item }) => {
    navigate(item.props.path)
  }

  return (
      <Sider
          collapsible
          collapsed={collapsed}
          onCollapse={(value) => setCollapsed(value)}
          theme={"light"}
      >
        <div
            style={{
              height: 30,
              margin: 6,
              padding: 5,
            }}
        >
          <FundOutlined />
          {title || "FIRST"}
        </div>
        <Menu
            className="sidebar-menu"
            mode="inline"
            selectedKeys={defaultSelectedKeys}
            items={sidebarItems}
            onClick={navigateToItem}
        />
      </Sider>
  );
};

export default Sidebar;
