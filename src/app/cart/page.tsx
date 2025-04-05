"use client";

import { CartModel } from "@/models/cart";
import { supabase } from "@/utils/supabase";
import { User } from "@supabase/supabase-js";
import { X } from "lucide-react";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import NavBar from "../components/NavBar";

const Cart = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [carts, setCarts] = useState<CartModel[] | null>(null);
  const getCarts = async (id: string | undefined) => {
    const { data } = await supabase
      .from("cart")
      .select("*, product(*), users(*)")
      .eq("users", id);
    console.log(`id: ${id}`);
    if (data) {
      const newCarts: CartModel[] = [];
      data.map((e) => {
        newCarts.push(e);
      });
      setCarts(newCarts);
    }
  };
  const removeToCart = async (id: number) => {
    await supabase
      .from("cart")
      .delete()
      .eq("id", id)
      .then(() => {
        toast("Remove from the cart");
        getCarts(currentUser?.id);
      });
  };

  useEffect(() => {
    const getUser = async () => {
      const user = await supabase.auth.getUser();
      setCurrentUser(user.data.user);
      getCarts(user.data.user?.id);
    };
    getUser();
  });
  return (
    <>
      <ToastContainer />
      <NavBar index={2} />
      <div className="flex flex-col gap-[8px]">
        {carts?.map((cart) => {
          return (
            <div
              key={cart.id}
              className="flex max-w-[400px] justify-between bg-gray-100 px-[8px] py-[5px] rounded-[8px]"
            >
              <p>{cart.product.name}</p>
              <X
                color="red"
                className="cursor-pointer"
                onClick={() => {
                  removeToCart(cart.id);
                }}
              />
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Cart;
