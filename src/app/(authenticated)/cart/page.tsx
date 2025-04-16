"use client";

import CartComponent from "@/app/components/Cart";
import CInput from "@/app/components/Input";
import { useGetCarts } from "@/app/state/cart_state";
import { Button } from "@/components/ui/button";
import { supabase } from "@/utils/supabase";
import { User } from "@supabase/supabase-js";
import { useCallback, useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
class TotalPrice {
  id: number;
  total: number;
  constructor(id: number, total: number) {
    this.id = id;
    this.total = total;
  }
}

const Cart = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const { carts } = useGetCarts(currentUser);
  const [cartLoading, setCartLoading] = useState<number | null>(null);
  const [total, setTotal] = useState<TotalPrice[]>([]);
  const [isCalled, setIsCalled] = useState(false);

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
    console.log("called");
    const newTotal: TotalPrice[] = [];
    console.log(`called 2: ${carts?.length}`);

    carts?.forEach((e) => {
      console.log(`tutal: ${e}`);

      newTotal.push(new TotalPrice(e.id, e.product.price));
      console.log(`total: ${e}`);
    });
    console.log(newTotal);
    setTotal(newTotal);
  }, [carts]);
  const getTotal = (totals: TotalPrice[]) => {
    let locTotal = 0;
    totals.forEach((e) => {
      locTotal += e.total;
    });
    return locTotal;
  };
  useEffect(() => {
    const getUser = async () => {
      const user = await supabase.auth.getUser();
      setCurrentUser(user.data.user);
    };
    getUser();
    console.log(isCalled);
    if (!isCalled && carts) {
      console.log("titer");
      calculateTotal();

      setIsCalled(true);
    }
  }, [carts, calculateTotal, isCalled]);

  const updateCartTotal = (id: number, newTotal: number) => {
    const value = total.find((t) => t.id === id);
    if (value) {
      value.total = newTotal;
      setTotal([...total]);
    }
  };

  return (
    <>
      <ToastContainer />
      {carts && carts.length > 0 ? (
        <div className="flex flex-col md:flex-row justify-center gap-[24px] m-[24px]">
          <div className="flex flex-col gap-[16px] border-[1px] p-[24px] bg-white h-fit">
            <h1>Cart</h1>
            <hr />
            {carts?.map((cart) => {
              console.log(`cart qty ${cart.id}: ${cart.qty}`);
              return (
                <CartComponent
                  key={cart.id}
                  cart={cart}
                  loadingId={cartLoading}
                  onDelete={() => removeToCart(cart.id)}
                  onDecrement={(id, newTotal) => updateCartTotal(id, newTotal)}
                  onIncrement={(id, newTotal) => updateCartTotal(id, newTotal)}
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
            <div className="flex justify-between">
              <p>Total</p>
              <p>₱{getTotal(total)}</p>
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
