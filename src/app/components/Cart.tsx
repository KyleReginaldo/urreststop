"use client";
import { CartModel } from "@/models/cart";
import { Minus, Plus } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

export interface Props {
  cart: CartModel;
  onDelete: () => void;
  loadingId?: number | null;
  onDecrement?: (id: number, total: number) => void;
  onIncrement?: (id: number, total: number) => void;
}

const CartComponent = (props: Props) => {
  const [qty, setQty] = useState(props.cart.qty || 1);

  const decrement = () => {
    if (qty > 1) {
      const newQty = qty - 1;
      props.cart.updateQty(newQty);
      setQty(newQty);
      props.onDecrement?.(props.cart.id, props.cart.product.price * newQty);
    } else {
      props.onDelete();
    }
    console.log(`decrement: ${props.cart.qty}`);
  };

  const incrementQuantity = () => {
    const newQty = qty + 1;
    console.log(`increment: ${props.cart.qty}`);
    props.cart.updateQty(newQty);
    setQty(newQty);
    props.onIncrement?.(props.cart.id, props.cart.product.price * newQty);
  };

  return (
    <div
      key={props.cart.id}
      className="flex items-center gap-[16px] max-w-[500px]"
    >
      <Image
        src={props.cart.product.image_link}
        alt={props.cart.product.name}
        width={100}
        height={100}
        objectFit="cover"
      />
      <div className="flex flex-col">
        <p>{props.cart.product.name}</p>
        <p
          className={`${
            (props.cart.qty ?? 1) > 1 ? "text-gray-500" : "text-black"
          }`}
        >
          ₱{props.cart.product.price}{" "}
          {qty > 1 ? (
            <span className="text-black">
              ₱{props.cart.product.price * qty}
            </span>
          ) : null}
        </p>
        <div className="flex flex-row items-center gap-[16px]">
          <div className="flex items-center w-fit gap-[10px] bg-gray-200 rounded-[4px] px-[4px]">
            <Minus
              size={16}
              onClick={decrement} // Use decrement function
            />
            <p className="text-[14px]">{qty}</p>
            <Plus
              size={16}
              onClick={incrementQuantity} // Use increment function
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartComponent;
