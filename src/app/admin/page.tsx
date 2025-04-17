"use client";

import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ProductModel } from "@/models/product";
import { supabase } from "@/utils/supabase";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
const AdminProduct = () => {
  const [products, setProducts] = useState<ProductModel[] | null>(null);

  const fetchProducts = useCallback(async () => {
    const { data, error } = await supabase
      .from("product")
      .select("*, category(*), type(*)");
    if (error) {
      console.log(error.message);
    }
    console.log(data);
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
          router.push("/admin/add-product");
        }}
        className="mb-[16px]"
      >
        Add Product
      </Button>
      {/* <div className="grid grid-cols-3 lg:grid-cols-6 gap-[8px]">
        {products?.map((product) => {
          return (
            <div
              className="group relative bg-[#bf926466] h-[150px] lg:h-[200px] rounded-[8px]"
              key={product.id}
            >
              <Image
                alt={product.name}
                src={product.image_link}
                layout="fill"
                objectFit="cover"
                className="relative z-0 opacity-100"
              />
              <div className="absolute bottom-[0] left-[0] right-[0] p-[4px] text-white bg-[#000000af] rounded-bl-[8px] rounded-br-[8px]">
                <p>{product.name}</p>
                <p>₱{product.price}</p>
              </div>
            </div>
          );
        })}
      </div> */}
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">ID</TableHead>
            <TableHead>Image</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Qty</TableHead> <TableHead>Category</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products?.map((product) => (
            <TableRow key={product.id}>
              <TableCell className="font-medium">{product.id}</TableCell>
              <TableCell>
                <div>
                  <Image
                    src={product.image_link}
                    alt={product.name}
                    width={48}
                    height={48}
                  />
                </div>
              </TableCell>
              <TableCell>{product.name}</TableCell>
              <TableCell>{product.price}</TableCell>
              <TableCell>{product.qty}</TableCell>
              <TableCell>{product.category.name}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default AdminProduct;
