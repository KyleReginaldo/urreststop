"use client";

import { Button } from "@/components/ui/button";
import { ProductModel } from "@/models/product";
import { supabase } from "@/utils/supabase";
import { User } from "@supabase/supabase-js";
import { MoveRight, ShoppingCart } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import { toast } from "react-toastify";

export interface Props {
  product: ProductModel;
}

const Product = ({ product }: Props) => {
  const router = useRouter();
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const getUser = async () => {
    const { data } = await supabase.auth.getUser();
    setCurrentUser(data?.user || null);
  };

  useEffect(() => {
    getUser();
  }, []);

  const notify = (message: string) => toast(message);

  const addToCart = async (productId: number) => {
    if (!currentUser) {
      notify("Please log in to add to the cart.");
      return;
    }

    setLoading(true);

    try {
      const { data } = await supabase
        .from("cart")
        .select()
        .eq("product", productId)
        .eq("users", currentUser?.id)
        .single();

      if (data) {
        notify("Product is already in the cart!");
      } else {
        await supabase.from("cart").insert({
          product: productId,
          users: currentUser?.id,
        });
        notify("Added to cart!");
      }
    } catch (error) {
      console.error(error);
      notify("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative bg-black">
      <Image
        alt={product.name}
        src={product.image_link}
        layout="fill"
        objectFit="cover"
        className="!relative z-0 opacity-80"
      />
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white">
        <p>{product.name}</p>
        <p>₱{product.price.toFixed(2)}</p>

        <Button
          className="cursor-pointer mb-[16px]"
          onClick={() => router.push(`/shop/${product.id}`)}
        >
          Shop Now <MoveRight />
        </Button>

        <Button
          className="cursor-pointer"
          onClick={() => addToCart(product.id)}
        >
          {loading ? (
            <>
              Loading...{" "}
              <ClipLoader
                color="white"
                size={16}
                aria-label="Loading Spinner"
              />
            </>
          ) : (
            <>
              Add to Cart <ShoppingCart />
            </>
          )}
        </Button>
      </div>
    </div>
  );
};

export default Product;
