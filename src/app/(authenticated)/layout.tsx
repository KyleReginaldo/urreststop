"use client";

import NavBar from "../components/NavBar";

const Layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div>
      <NavBar />
      {children}
    </div>
  );
};

export default Layout;
