"use client";

import { Button } from "@/components/ui/button";
import { supabase } from "@/utils/supabase";
import { User } from "@supabase/supabase-js";
import { Menu, ShoppingCart, X } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import LogoutModal from "./LogoutModal";

const NavBar = () => {
  const [modalOpen, setModal] = useState<boolean>(false);
  const router = useRouter();
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isOpen, setOpen] = useState(false);
  const pathname = usePathname();
  const isActive = (path: string) => pathname === path;
  const logout = async () => {
    await supabase.auth.signOut().then((e) => {
      if (!e.error) {
        router.replace("/");
      }
    });
  };
  useEffect(() => {
    const getUser = async () => {
      const user = await supabase.auth.getUser();
      setCurrentUser(user.data.user);
    };
    getUser();
  });
  return (
    <div className="sticky top-0 z-50">
      <div className="flex justify-between items-center bg-[#BF9264] p-[16px]">
        <p className="font-bold text-[#F8F4E1]">
          <Link href="/home">&apos;UR REST STOP</Link>
        </p>
        <ul className="hidden md:flex justify-center gap-[24px]">
          <li
            className={`hover:text-gray-500 cursor-pointer ${
              isActive("/home") ? "text-[white] font-medium" : "text-[#DBDBDB]"
            }`}
          >
            <Link href="/home">Home</Link>
          </li>
          <li
            className={`hover:text-gray-500 cursor-pointer ${
              isActive("/shop") ? "text-[white] font-medium" : "text-[#DBDBDB]"
            }`}
          >
            <Link href="/shop">Shop</Link>
          </li>
          <li
            className={`hover:text-gray-500 cursor-pointer ${
              isActive("/cart") ? "text-[white] font-medium" : "text-[#DBDBDB]"
            }`}
          >
            <Link href="/cart">Cart</Link>
          </li>
        </ul>

        <div className="flex items-center gap-[8px]">
          <ShoppingCart
            className="md:hidden cursor-pointer text-white"
            onClick={() => router.push("/cart")}
          />
          {isOpen ? (
            <X
              className="md:hidden cursor-pointer animate-none md:animate-spin text-white"
              onClick={() => {
                setOpen(!isOpen);
                console.log("open the close");
              }}
            />
          ) : (
            <Menu
              className="md:hidden cursor-pointer animate-none md:animate-spin text-white"
              onClick={() => {
                setOpen(!isOpen);
                console.log("open the close");
              }}
            />
          )}
          {currentUser ? (
            <Button
              onClick={() => {
                // logout();
                setModal(!modalOpen);
              }}
              className="hidden md:block bg-[#F8F4E1] text-[#BF9264] rounded-none cursor-pointer"
            >
              Logout
            </Button>
          ) : (
            <a
              href=""
              className="hidden md:block hover:text-gray-700 cursor-pointer"
            >
              Login/Register
            </a>
          )}
        </div>
      </div>

      <ul
        className={`md:hidden flex flex-col justify-center items-center gap-[10px] ${
          isOpen ? "h-40" : "h-0"
        } bg-[#BF9264] transition-all delay-150 duration-300 overflow-hidden w-full`}
      >
        <li>
          <Link
            href="/"
            className={`${
              isActive("/home") ? "text-[white] font-medium" : "text-[#DBDBDB]"
            }`}
          >
            Home
          </Link>
        </li>
        <li>
          <Link
            href="/shop"
            className={`${
              isActive("/shop") ? "text-[white] font-medium" : "text-[#DBDBDB]"
            }`}
          >
            {" "}
            Shop
          </Link>
        </li>
        <li>
          <Link
            href="/"
            className={`${
              isActive("/account")
                ? "text-[white] font-medium"
                : "text-[#DBDBDB]"
            }`}
          >
            Account
          </Link>
        </li>
        <li>
          <Button
            onClick={() => {
              // logout();
              setModal(!modalOpen);
            }}
            className="bg-[#F8F4E1] text-[#BF9264] rounded-none cursor-pointer"
          >
            Logout
          </Button>
        </li>
      </ul>
      <LogoutModal
        isVisible={modalOpen}
        onClose={() => {
          setModal(false);
        }}
        onLogout={() => {
          logout();
        }}
      />
    </div>
  );
};

export default NavBar;
