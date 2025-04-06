"use client";

import { ProductModel } from "@/models/product";
import { supabase } from "@/utils/supabase";
import { useCallback, useEffect, useState } from "react";
import Product from "./Product";
import Shimmer from "./Shimmer";

const FeaturedProducts = () => {
  const [products, setProducts] = useState<ProductModel[] | null>(null);

  const fetchProducts = useCallback(async () => {
    const { data } = await supabase.from("product").select("*, category(*)");
    const fetchedProducts = data?.map((e) => new ProductModel(e)) || [];
    setProducts(fetchedProducts);
  }, []);
  useEffect(() => {
    fetchProducts();
  }); // Added empty dependency array to prevent infinite loop

  return (
    <div className="bg-[#f6f6f6] p-[32px] mb-[60px]">
      <h1 className="font-bold">FEATURED PRODUCTS</h1>
      <hr />
      <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-6 mt-[20px] gap-[16px]">
        {products && products.length > 0
          ? products.map((product) => (
              <Product key={product.id} product={product} />
            ))
          : // Show loading shimmer if products are not yet loaded
            Array.from({ length: 3 }).map((_, index) => (
              <Shimmer key={index} />
            ))}
      </div>
    </div>
  );
};

export default FeaturedProducts;
