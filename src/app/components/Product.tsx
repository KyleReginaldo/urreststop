"use client";
import { Button } from "@/components/ui/button";
import { ProductModel } from "@/models/product";
import { supabase } from "@/utils/supabase";
import { User } from "@supabase/supabase-js";
import { MoveRight, ShoppingCart } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import product1 from "../../../public/images/product1.jpg";

export interface Props {
  product: ProductModel;
}

const Product = (prop: Props) => {
  const router = useRouter();
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  useEffect(() => {
    const getUser = async () => {
      const user = await supabase.auth.getUser();
      setCurrentUser(user.data.user);
    };
    getUser();
  });
  const notify = (text: string) => toast(text);

  const addToCart = async (id: number) => {
    console.log(currentUser?.id);
    const cart = await supabase
      .from("cart")
      .select()
      .eq("product", id)
      .eq("users", currentUser?.id)
      .single();
    console.log(cart.data);
    if (cart.data) {
      notify("Already in the cart!");
    } else {
      await supabase
        .from("cart")
        .insert({
          product: id,
          users: currentUser?.id,
        })
        .then(() => {
          notify("Added to cart");
        });
    }
  };
  return (
    <div className="relative bg-black">
      <Image alt="" src={product1} className="relative z-0 opacity-80" />
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white">
        <p className="">{prop.product.name}</p>
        <p>₱{prop.product.price.toFixed(2)}</p>
        <Button
          className="cursor-pointer mb-[16px]"
          onClick={() => {
            router.push(`/shop/${prop.product.id}`);
          }}
        >
          Shop Now <MoveRight />
        </Button>{" "}
        <Button
          className="cursor-pointer"
          onClick={() => {
            addToCart(prop.product.id);
          }}
        >
          Add to Cart <ShoppingCart />
        </Button>
      </div>
    </div>
  );
};

export default Product;
