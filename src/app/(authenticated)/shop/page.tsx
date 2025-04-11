"use client";

import { useProduct } from "@/app/state/product_state";
import { CategoryModel } from "@/models/product";
import { supabase } from "@/utils/supabase";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import ClipLoader from "react-spinners/ClipLoader";

const Shop = () => {
  const [categories, setCategories] = useState<CategoryModel[] | null>(null);
  const [selectedCategory, selectCategory] = useState<number | null>(null);
  const { loading, products, setCategoryId } = useProduct();

  // Fetch products based on selected category

  // Fetch categories from the database
  const fetchCategories = async () => {
    const { data } = await supabase.from("category").select("*");
    const fetchedCategories = data?.map((e) => new CategoryModel(e)) || [];
    setCategories(fetchedCategories);
  };

  // Initialize data fetch
  const fetchData = useCallback(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Handle category selection
  const handleCategorySelect = (categoryId: number) => {
    selectCategory(categoryId);
    setCategoryId(categoryId);
  };

  return (
    <div className="flex flex-col items-center justify-center gap-[32px] p-[32px]">
      <ul className="hidden md:flex flex-row items-center gap-[16px]">
        <li
          onClick={() => {
            selectCategory(null); // Reset the selected category
            setCategoryId(null);
          }}
          className={`cursor-pointer ${
            !selectedCategory
              ? "border-[#b18f67] text-[#b19068] bg-[#b1906828]"
              : "border-gray-300 text-gray-500"
          } transition-all border-[1px] px-[8px] py-[2px] rounded-[25px]`}
        >
          All Products
        </li>
        {categories ? (
          categories.map((category) => (
            <li
              key={category.id}
              onClick={() => handleCategorySelect(category.id)}
              className={`cursor-pointer ${
                category.id === selectedCategory
                  ? "border-[#b18f67] text-[#b19068] bg-[#b1906828]"
                  : "border-gray-300 text-gray-500"
              } transition-all border-[1px] px-[8px] py-[2px] rounded-[25px]`}
            >
              {category.name}
            </li>
          ))
        ) : (
          <p>Loading categories...</p>
        )}
      </ul>

      {loading ? (
        <ClipLoader />
      ) : products && products.length > 0 ? (
        <div className="grid grid-cols-1 content-center md:grid-cols-4 xl:grid-cols-6 gap-[32px]">
          {products.map((product) => (
            <div key={product.id} className="flex flex-col gap-[8px]">
              <Image
                alt={product.name}
                src={product.image_link}
                layout="fill"
                objectFit="cover"
                className="!relative z-0"
              />
              <p className="text-[15px] font-light">{product.name}</p>
              <p className="text-[14px] font-light">
                ₱{product.price.toFixed(2)}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex justify-center">
          <p className="text-center">No products available.</p>
        </div>
      )}
    </div>
  );
};

export default Shop;
