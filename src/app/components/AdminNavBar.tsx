"use client";
import { Menu } from "lucide-react";
import { useState } from "react";
type CustomProps = {
  onToggle: (val: boolean) => void;
};

const AdminNavBar = (props: CustomProps) => {
  const [close, setClose] = useState(false);
  return (
    <div className="flex p-[16px] bg-white gap-[16px]">
      <Menu
        className="cursor-pointer"
        onClick={() => {
          setClose(!close);
          props.onToggle(close);
        }}
      />
      <p>Product</p>
    </div>
  );
};

export default AdminNavBar;
