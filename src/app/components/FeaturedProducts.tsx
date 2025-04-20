"use client";

import { ProductModel } from "@/models/product";
import { supabase } from "@/utils/supabase";
import { useCallback, useEffect, useRef, useState } from "react";
import Product from "./Product";
import Shimmer from "./Shimmer";

const FeaturedProducts = () => {
  const [products, setProducts] = useState<ProductModel[] | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const cardWidth = 260; // Approximate width of each product card (adjust as needed)

  const fetchProducts = useCallback(async () => {
    const { data } = await supabase
      .from("product")
      .select("*, category(*), type(*)");

    const fetchedProducts = data?.map((e) => new ProductModel(e)) || [];
    setProducts(fetchedProducts);
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const scroll = (direction: "left" | "right") => {
    if (!containerRef.current) return;
    const scrollAmount = direction === "left" ? -cardWidth * 3 : cardWidth * 3;

    containerRef.current.scrollBy({
      left: scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <div className="flex flex-col items-center p-8 mb-16 h-fit relative">
      <h1 className="font-bold text-xl mb-4 text-[#43261b]">OUR GOODS</h1>

      {/* Scrollable container */}
      <div
        ref={containerRef}
        className="w-full flex flex-row md:grid md:grid-cols-4 gap-4 overflow-x-scroll no-scrollbar max-w-[1100px]"
      >
        {products
          ? products.map((product) => (
              <Product key={product.id} product={product} />
            ))
          : Array.from({ length: 3 }).map((_, index) => (
              <Shimmer key={index} />
            ))}
      </div>

      {/* Navigation buttons */}
      <div className="md:hidden flex gap-6 mt-6 items-center">
        <button
          onClick={() => scroll("left")}
          className="text-gray-600 hover:text-black px-2"
        >
          ←
        </button>
        <button
          onClick={() => scroll("right")}
          className="text-gray-600 hover:text-black px-2"
        >
          →
        </button>
      </div>
    </div>
  );
};

export default FeaturedProducts;
