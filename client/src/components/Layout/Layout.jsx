import React from "react";
import s from "./Layout.module.scss";

const Layout = ({ children }) => {
  return <div className={s.wrapper}>{children}</div>;
};

export default Layout;
