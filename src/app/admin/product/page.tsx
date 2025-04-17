"use client";

import { Button } from "@/components/ui/button";
import { ProductModel } from "@/models/product";
import { supabase } from "@/utils/supabase";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

import Image from "next/image";
const AdminProduct = () => {
  const [products, setProducts] = useState<ProductModel[] | null>(null);

  const fetchProducts = useCallback(async () => {
    const { data } = await supabase.from("product").select("*, category(*)");
    const fetchedProducts = data?.map((e) => new ProductModel(e)) || [];
    setProducts(fetchedProducts);
  }, []);
  useEffect(() => {
    fetchProducts();
  }); // Added empty d
  const router = useRouter();
  return (
    <div className="w-[100vw] p-[24px]">
      <Button
        onClick={() => {
          router.push("/admin/product/add-product");
        }}
        className="mb-[16px]"
      >
        Add Product
      </Button>
      <div className="grid grid-cols-3 lg:grid-cols-6">
        {products?.map((product) => {
          return (
            <div
              className="group relative bg-black h-[150px] lg:h-[200px] rounded-[8px]"
              key={product.id}
            >
              <Image
                alt={product.name}
                src={product.image_link}
                layout="fill"
                objectFit="cover"
                className="relative z-0 opacity-80"
              />
              <div className="absolute bottom-[8px] left-[8px] text-white">
                <p>{product.name}</p>
                <p>₱{product.price}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AdminProduct;
