import { CartModel } from "@/models/cart";
import { Minus, Plus, Trash2 } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import ClipLoader from "react-spinners/ClipLoader";

export interface Props {
  cart: CartModel;
  onDelete: () => void;
  loadingId?: number | null;
}

const CartComponent = (props: Props) => {
  // Using state for the quantity
  const [qty, setQuantity] = useState<number>(props.cart.qty ?? 1);

  // Decrement function to update the quantity state
  const decrement = () => {
    if (qty > 1) {
      // Prevent going below 1
      setQuantity(qty - 1);
      props.cart.qty = qty;
    }
  };

  // Increment function to update the quantity state
  const incrementQuantity = () => {
    setQuantity(qty + 1);
    props.cart.qty = qty;
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
        <p className={`${qty > 1 ? "text-gray-500" : "text-black"}`}>
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

          {props.loadingId === props.cart.id ? (
            <div className="flex gap-[8px] items-center">
              <ClipLoader color="red" size={16} aria-label="Loading Spinner" />
              <p className="text-[12px] text-red-500">Loading...</p>
            </div>
          ) : (
            <div
              className="flex items-center justify-center px-[6px] py-[3px] rounded-[4px] text-red-600 cursor-pointer"
              onClick={() => props.onDelete()}
            >
              <Trash2 size={16} />
              <p className="text-[12px] text-center">Delete</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartComponent;
