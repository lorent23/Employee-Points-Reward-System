import React from 'react';
import { Spin } from 'antd';
import cn from "classnames";

const Spinner = () => (
  <div
    className={cn("h-full", "w-full", "flex", "items-center", "justify-center")}
  >
    <Spin tip="Loading..." />
  </div>
);

export default Spinner;
