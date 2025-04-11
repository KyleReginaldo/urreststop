"use client";

import CartComponent from "@/app/components/Cart";
import CInput from "@/app/components/Input";
import { useGetCarts } from "@/app/state/cart_state";
import { Button } from "@/components/ui/button";
import { supabase } from "@/utils/supabase";
import { User } from "@supabase/supabase-js";
import { useCallback, useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";

const Cart = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [cartLoading, setCartLoading] = useState<number | null>(null);
  const [total, setTotal] = useState<number>(0);
  const { carts, setUser } = useGetCarts();

  const removeToCart = async (id: number) => {
    if (!currentUser) {
      toast("Please login first.");
      return;
    }

    setCartLoading(id);

    try {
      await supabase.from("cart").delete().eq("id", id);
      toast("Removed from the cart");
    } catch (error) {
      console.error(error);
      toast("An error occurred. Please try again.");
    }
    setCartLoading(null);
  };

  const calculateTotal = useCallback(() => {
    let total = 0;
    carts?.forEach((e) => {
      total += e.product.price * (e.qty ?? 1);
    });
    setTotal(total);
  }, [carts]);
  useEffect(() => {
    const getUser = async () => {
      const user = await supabase.auth.getUser();
      setCurrentUser(user.data.user);
      setUser(user.data.user);
    };
    calculateTotal();
    getUser();
  }, [calculateTotal, setUser]);
  return (
    <>
      <ToastContainer />
      {carts && carts.length > 0 ? (
        <div className="flex flex-col md:flex-row justify-center gap-[24px]">
          <div className="flex flex-col gap-[16px] border-[1px] p-[24px] bg-white h-fit">
            <h1>Cart</h1>
            <hr />
            {carts?.map((cart) => {
              return (
                <CartComponent
                  key={cart.id}
                  cart={cart}
                  loadingId={cartLoading}
                  onDelete={() => {
                    removeToCart(cart.id);
                  }}
                />
              );
            })}
          </div>
          <div className="flex flex-col h-fit gap-[10px] border-[1px]  p-[24px] bg-white">
            <h1>SHIPPING/PICKUP</h1>
            <div className="flex gap-[10px]">
              <CInput
                type="text"
                placeholder="First Name"
                onChange={(e) => {
                  console.log(e.target.value);
                }}
              />
              <CInput
                type="text"
                placeholder="Last Name"
                onChange={(e) => {
                  console.log(e.target.value);
                }}
              />
            </div>
            <CInput
              type="text"
              placeholder="City"
              onChange={(e) => {
                console.log(e.target.value);
              }}
            />
            <div className="flex gap-[10px]">
              <CInput
                type="text"
                placeholder="Street Address"
                onChange={(e) => {
                  console.log(e.target.value);
                }}
              />
              <CInput
                type="text"
                placeholder="Apt, Unit, Suite, etc (Optional)"
                onChange={(e) => {
                  console.log(e.target.value);
                }}
              />
            </div>
            <CInput
              type="text"
              placeholder="Zip Code"
              onChange={(e) => {
                console.log(e.target.value);
              }}
            />
            <div className="flex jsutify-between">
              <p>Total:</p>
              <p>{total}</p>
            </div>
            <Button className="rounded-[0]">Checkout</Button>
          </div>
        </div>
      ) : (
        <p className="text-center">No item on the cart.</p>
      )}
    </>
  );
};

export default Cart;
