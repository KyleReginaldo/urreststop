"use client";
import { Menu } from "lucide-react";
import { usePathname } from "next/navigation";
import { useState } from "react";
type CustomProps = {
  onToggle: (val: boolean) => void;
};

const AdminNavBar = (props: CustomProps) => {
  const [close, setClose] = useState(false);
  const pathname = usePathname();
  console.log(pathname);

  return (
    <div className="flex p-[16px] bg-white gap-[16px]">
      <Menu
        className="cursor-pointer"
        onClick={() => {
          setClose(!close);
          props.onToggle(close);
        }}
      />
      <p className="text-[16px] font-medium">
        {pathname.substring(7).toUpperCase()}
      </p>
    </div>
  );
};

export default AdminNavBar;
