"use client";

import { CartModel } from "@/models/cart";
import { supabase } from "@/utils/supabase";
import { User } from "@supabase/supabase-js";
import { useEffect, useState } from "react";

export function useGetCarts() {
  const [carts, setCarts] = useState<CartModel[] | null>(null);
  const [currentUser, setUser] = useState<User | null>(null);
  useEffect(() => {
    const getCarts = async () => {
      if (!currentUser) {
        return;
      }
      const { data } = await supabase
        .from("cart")
        .select("*, product(*), users(*)")
        .eq("users", currentUser.id);
      setCarts(data ? data.map((e) => new CartModel(e)) : null);
    };
    getCarts();
  }, [setCarts, currentUser]);
  return { carts, setUser };
}
