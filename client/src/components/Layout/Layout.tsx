import React from "react";
import s from './Layout.module.scss'

type Props = {
  children: React.ReactNode
}

const Layout = ({ children }: Props) => {
  return (
    <div className={s.wrapper}>

      {children}
    </div>
  );
}

export default Layout;