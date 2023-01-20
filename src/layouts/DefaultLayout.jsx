import React, { Suspense } from "react";
import { Layout, Spin, theme } from "antd";
import Sidebar from "../components/sidebar/Sidebar.jsx";
import Header from "../components/header/Header.jsx";
import cn from "classnames";

const { Content, Footer } = Layout;

const Spinner = () => (
  <div
    className={cn("h-full", "w-full", "flex", "items-center", "justify-center")}
  >
    <Spin tip="Loading..." />
  </div>
);

const DefaultLayout = ({ children }) => {
  return (
    <Layout
      style={{
        minHeight: "100vh",
      }}
      hasSider={true}
    >
      <Sidebar />
      <Layout className="site-layout">
        <Header />
        <Content
          style={{ overflow: "initial" }}
          className={cn("!m-3", "!mb-0")}
        >
          {/*ToDo: Create and add styled loading spinner component*/}
          <Suspense fallback={<Spinner />}>{children}</Suspense>
        </Content>
        <div style={{ textAlign: "center" }}>Geko ©2023</div>
      </Layout>
    </Layout>
  );
};

export default DefaultLayout;
