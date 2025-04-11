"use client";
import { ProductModel } from "@/models/product";
import { supabase } from "@/utils/supabase";
import { useEffect, useState } from "react";

export function useProduct() {
  const [loading, setLoading] = useState<boolean>(false);
  const [products, setProducts] = useState<ProductModel[]>([]);
  const [categoryId, setCategoryId] = useState<number | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      const query = supabase.from("product").select("*, category(*)");
      if (categoryId) {
        query.eq("category", categoryId); // Filter products by category
      }
      const { data } = await query;
      const fetchedProducts = data?.map((e) => new ProductModel(e)) || [];
      setProducts(fetchedProducts);
      setLoading(false);
    };

    fetchProducts();
  }, [categoryId]);

  return { loading, products, setCategoryId };
}
