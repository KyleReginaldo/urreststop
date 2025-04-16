"use client";

import { CartModel } from "@/models/cart";
import { supabase } from "@/utils/supabase";
import { User } from "@supabase/supabase-js";
import { useEffect, useState } from "react";

export function useGetCarts(user: User | null) {
  const [carts, setCarts] = useState<CartModel[] | null>(null);

  useEffect(() => {
    const getCarts = async () => {
      if (!user) return;
      const { data } = await supabase
        .from("cart")
        .select("*, product(*), users(*)")
        .eq("users", user.id);
      setCarts(data ? data.map((e) => new CartModel(e)) : null);
    };

    getCarts();
  }, [user]); // Will only run once when `user` is first passed

  return { carts };
}
