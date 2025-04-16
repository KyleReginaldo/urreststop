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
    <div className="group relative bg-black">
      <Image
        alt={product.name}
        src={product.image_link}
        layout="fill"
        objectFit="cover"
        className="!relative z-0 opacity-80"
      />
      <div className="absolute bottom-0 left-0 right-0 text-white md:hidden group-hover:md:flex flex flex-col bg-[#00000050] p-[10px]">
        <p className="text-[16px] font-normal">{product.name}</p>
        <p className="text-[15px] font-medium">₱{product.price.toFixed(2)}</p>

        <Button
          className="cursor-pointer mb-[16px] w-fit bg-white text-[#BF9264] rounded-none"
          onClick={() => router.push(`/shop/${product.id}`)}
        >
          Shop Now <MoveRight />
        </Button>

        <Button
          className="cursor-pointer w-fit bg-[#BF9264] rounded-none"
          onClick={() => addToCart(product.id)}
        >
          {loading ? (
            <>
              Loading...
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
