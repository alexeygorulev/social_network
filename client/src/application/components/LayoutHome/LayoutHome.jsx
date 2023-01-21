import React from "react";
import s from "./LayoutHome.module.scss";

const LayoutHome = ({ children }) => {
  return <div className={s.wrapper}>{children}</div>;
};

export default LayoutHome;
