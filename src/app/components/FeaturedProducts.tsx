"use client";

import { ProductModel } from "@/models/product";
import { supabase } from "@/utils/supabase";
import { useEffect, useState } from "react";
import Product from "./Product";
import Shimmer from "./Shimmer";

const FeaturedProducts = () => {
  const [products, setProducts] = useState<ProductModel[] | null>(null);
  useEffect(() => {
    const getProducts = async () => {
      const newProducts: ProductModel[] = [];
      const { data } = await supabase.from("product").select("*, category(*)");

      data?.map((e) => {
        newProducts?.push(new ProductModel(e));
      });
      setProducts(newProducts);
    };
    getProducts();
  });

  return (
    <div className="bg-[#f6f6f6] p-[32px] mb-[60px]">
      <h1 className="font-bold">FEATURED PRODUCTS</h1>
      <hr />
      <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-6 mt-[20px] gap-[16px]">
        {products
          ? products?.map((e) => {
              return <Product product={e} key={e.id} />;
            })
          : [<Shimmer key={1} />, <Shimmer key={2} />, <Shimmer key={3} />]}
      </div>
    </div>
  );
};

export default FeaturedProducts;
