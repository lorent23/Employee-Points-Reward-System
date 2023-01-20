import React from "react";
import { Outlet } from "react-router-dom";
import cn from "classnames";

const PublicLayout = ( ) => {
  return <div className={cn("flex", "items-center", "justify-center", "h-[100vh]")}>
      <Outlet />
  </div>;
}

export default PublicLayout;
