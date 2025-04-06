"use client";
import { ProductModel } from "@/models/product";
import { supabase } from "@/utils/supabase";
import { Minus, Plus } from "lucide-react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
function ShopDetails() {
  const params = useParams<{ slug: string }>();
  const [product, setProduct] = useState<ProductModel | null>(null);
  const [quantity, setQuantity] = useState<number>(1);

  const getProductById = useCallback(async () => {
    const { data } = await supabase
      .from("product")
      .select("*, category(*)")
      .eq("id", params.slug)
      .single();
    if (data) {
      setProduct(new ProductModel(data));
    }
  }, [params]);

  const decrement = useCallback(() => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  }, [quantity]);
  const increment = useCallback(() => {
    setQuantity(quantity + 1);
  }, [quantity]);

  useEffect(() => {
    getProductById();
  }, [getProductById]);
  return (
    <>
      {product ? (
        <div className="flex justify-center">
          <div className="flex flex-col items-start max-w-[700px] gap-[16px]">
            <Image
              alt={product!.name}
              src={product!.image_link}
              width={400}
              height={400}
              objectFit="cover"
              className="self-center"
            />
            <p className="text-[24px] font-[500]">{product!.name}</p>
            <p className="text-[20px]">₱{product.price}</p>
            <p className="">
              Indulge in the rich and decadent flavor of our Dark Chocolate
              Cookie. Made with premium cocoa, this treat is perfect for
              satisfying your sweet tooth cravings.
            </p>
            <p className="text-[18px]">Quantity</p>
            <div className="flex gap-[8px] items-center">
              <Minus
                size={16}
                onClick={decrement} // Use decrement function
              />
              <p className="text-[14px]">{quantity}</p>
              <Plus
                size={16}
                onClick={increment} // Use increment function
              />
            </div>
            <p className="text-[20px]">Subtotal ₱{product.price * quantity}</p>
          </div>
        </div>
      ) : (
        <p></p>
      )}
    </>
  );
}

export default ShopDetails;
