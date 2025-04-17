"use client";

import { useState } from "react";
import AdminNavBar from "../components/AdminNavBar";
import SideBar from "../components/SideBar";

const Layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const [closed, setClose] = useState(false);

  return (
    <div className="flex flex-col md:flex-row overflow-x-hidden">
      <SideBar closed={closed} />
      <div className="flex flex-col">
        <AdminNavBar
          onToggle={(e) => {
            setClose(e);
          }}
        />
        {children}
      </div>
    </div>
  );
};

export default Layout;
