"use client";

import SideBar from "../components/SideBar";

const Layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className="flex flex-col md:flex-row">
      <SideBar />
      {children}
    </div>
  );
};

export default Layout;
