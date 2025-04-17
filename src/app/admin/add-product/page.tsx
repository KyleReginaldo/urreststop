"use client";
import { CategoryDropDown } from "@/app/components/CategoryDropDown";
import { TypeDropDown } from "@/app/components/TypeDropDown";
import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/utils/supabase";
import { Upload } from "lucide-react";
import Image from "next/image";
import { useCallback, useState } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import { toast, ToastContainer } from "react-toastify";
const AddProduct = () => {
  const [file, setFile] = useState<FileList | null>(null);
  const [name, setName] = useState<string | null>(null);
  const [price, setPrice] = useState<number>(1);
  const [qty, setQty] = useState<number>(1);
  const [category, setCategory] = useState<number | null>(null);
  const [type, setType] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const uploadProduct = useCallback(async () => {
    setIsLoading(true);
    let image: string | null = null;
    const bucket = "images";
    if (file) {
      const _file = file[0];

      const { data, error } = await supabase.storage
        .from(bucket)
        .upload(_file.name, _file);
      if (error) {
        setIsLoading(false);
        toast(error.message);
      }

      const { data: urlData } = await supabase.storage
        .from(bucket)
        .getPublicUrl(data?.path ?? "");
      image = urlData.publicUrl;
    }
    const { error } = await supabase.from("product").insert({
      image_link: image,
      name,
      price,
      qty,
      category,
      type,
    });
    if (error) {
      toast(error.message);
    }
    setIsLoading(false);
    toast("Product added.");
  }, [file, name, price, qty, type, category]);
  return (
    <div className="w-[100vw] p-[24px] h-[100vh] bg-[#F7F7F7]">
      <ToastContainer />
      <h1>Add New Product</h1>
      <div className="flex items-center justify-center mt-[16px]">
        <div className="flex flex-col md:flex-row gap-[24px]">
          <div className="flex flex-col bg-white p-[24px] items-center rounded-[8px] h-fit">
            <div className="flex gap-[16px]">
              <CategoryDropDown
                onSelect={(category) => {
                  setCategory(category.id);
                }}
              />
              <TypeDropDown
                onSelect={(type) => {
                  setType(type.id);
                }}
              />
            </div>
            {file ? (
              <Image
                src={URL.createObjectURL(file![0])}
                alt=""
                width={200}
                height={200}
              />
            ) : (
              <div className="flex flex-col justify-center items-center h-[200px] w-[200px] bg-[#F7F7F7] mt-[16px] rounded-[8px]">
                <p>Upload image</p>
                <p>No image to display.</p>
              </div>
            )}
            <div className="grid w-full max-w-sm items-center gap-1.5 mt-[16px]">
              <Label
                htmlFor="picture"
                className="flex justify-center bg-black py-[8px]"
              >
                <Upload size={16} color="white" />
                <p className="text-white">Upload a picture</p>
                <Input
                  id="picture"
                  type="file"
                  placeholder="Upload Image"
                  className="hidden"
                  onChange={(e) => {
                    setFile(e.target.files);
                  }}
                />
              </Label>
            </div>
          </div>
          <div className="flex flex-col gap-[10px] bg-white max-w-[500px] p-[24px] h-fit rounded-[8px]">
            <Label htmlFor="name">Product Name</Label>
            <Input
              type="text"
              placeholder="Product Name"
              value={name ?? ""}
              required
              onChange={(e) => {
                console.log(e.target.value);
                setName(e.target.value);
              }}
              className="w-[300px]"
            />
            <Label htmlFor="price">Price</Label>
            <Input
              type="text"
              placeholder="Price"
              required
              min={1}
              value={price ?? "1"}
              onChange={(e) => {
                setPrice(Number(e.target.value));
              }}
              className="w-[300px]"
            />{" "}
            <Label htmlFor="qty">Quantity</Label>
            <Input
              type="text"
              min={1}
              placeholder="Quantity"
              required
              value={qty ?? "1"}
              onChange={(e) => {
                setQty(Number(e.target.value));
              }}
              className="w-[300px]"
            />
            {isLoading ? (
              <ClipLoader
                color="black"
                size={16}
                aria-label="Loading Spinner"
              />
            ) : (
              <Button
                className="w-[300px] rounded-none"
                onClick={() => {
                  uploadProduct();
                }}
              >
                Submit
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
