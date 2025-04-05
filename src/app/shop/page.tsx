"use client";

import { CategoryModel, ProductModel } from "@/models/product";
import { supabase } from "@/utils/supabase";
import Image from "next/image";
import { useEffect, useState } from "react";
import product1 from "../../../public/images/product1.jpg";
import NavBar from "../components/NavBar";

const Shop = () => {
  const [categories, setCategories] = useState<CategoryModel[] | null>(null);
  const [products, setProducts] = useState<ProductModel[] | null>(null);
  const [selectedCategory, selectCategory] = useState<number | null>(null);

  const filterProducts = async (id: number) => {
    selectCategory(id);
    let newProducts: ProductModel[] = [];
    const { data } = await supabase
      .from("product")
      .select("*, category(*)")
      .eq("category", id);

    data?.map((e) => {
      newProducts?.push(new ProductModel(e));
    });
    setProducts(newProducts);
  };
  const getProducts = async () => {
    selectCategory(null);
    let newProducts: ProductModel[] = [];
    const { data } = await supabase.from("product").select("*, category(*)");

    data?.map((e) => {
      newProducts?.push(new ProductModel(e));
    });
    setProducts(newProducts);
  };
  useEffect(() => {
    const getCategories = async () => {
      let _categories: CategoryModel[] = [];
      const { data } = await supabase.from("category").select("*");

      data?.map((e) => {
        _categories?.push(new CategoryModel(e));
      });
      setCategories(_categories);
    };

    getCategories();
    getProducts();
  }, []);
  return (
    <>
      <NavBar index={1} />
      <div className="flex justify-center gap-[32px] bg-gray-100 p-[32px]">
        <ul className="hidden md:flex flex-col gap-[16px]">
          <li
            onClick={() => {
              getProducts();
            }}
            className="cursor-pointer"
          >
            All Products
          </li>
          {categories?.map((e) => {
            return (
              <li
                onClick={() => {
                  filterProducts(e.id);
                }}
                className={`cursor-pointer ${
                  e.id === selectedCategory ? "font-bold" : ""
                } transition-all`}
              >
                {e.name}
              </li>
            );
          })}
        </ul>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-[32px] max-w-[600px]">
          {products && products.length > 0 ? (
            products?.map((e) => {
              return (
                <div className="flex flex-col gap-[8px]">
                  <Image alt="" src={product1} className="relative z-0" />
                  <p>{e.name}</p>
                  <p>₱{e.price.toFixed(2)}</p>
                </div>
              );
            })
          ) : (
            <div className="flex justify-center place-items-center place-content-center">
              <p>No products available.</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Shop;
