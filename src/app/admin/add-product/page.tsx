"use client";
import { CategoryDropDown } from "@/app/components/CategoryDropDown";
import { TypeDropDown } from "@/app/components/TypeDropDown";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { supabase } from "@/utils/supabase";
import { Upload } from "lucide-react";
import Image from "next/image";
import { useCallback, useState } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import { toast, ToastContainer } from "react-toastify";
const AddProduct = () => {
  const [files, setFiles] = useState<FileList | null>(null);
  const [name, setName] = useState<string | null>(null);
  const [price, setPrice] = useState<number>(1);
  const [qty, setQty] = useState<number>(1);
  const [category, setCategory] = useState<number | null>(null);
  const [type, setType] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [flavor, setFlavor] = useState<string | null>(null);
  const [flavors, setFlavors] = useState<string[] | null>(null);

  const uploadProduct = useCallback(async () => {
    setIsLoading(true);
    const images: string[] = [];
    const bucket = "images";
    if (files) {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const { data, error } = await supabase.storage
          .from(bucket)
          .upload(file.name, file);
        if (error) {
          setIsLoading(false);
          toast(error.message);
        }

        const { data: urlData } = await supabase.storage
          .from(bucket)
          .getPublicUrl(data?.path ?? "");
        images.push(urlData.publicUrl);
      }
    }
    const { error } = await supabase.from("product").insert({
      image_links: images,
      name,
      price,
      qty,
      category,
      type,
      flavors,
    });
    if (error) {
      toast(error.message);
    }
    setIsLoading(false);
    toast("Product added.");
  }, [files, name, price, qty, type, category, flavors]);
  return (
    <div className="w-[100vw] p-[24px] h-[100vh] bg-[#F7F7F7]">
      <ToastContainer />
      <h1>Add New Product</h1>
      <div className="flex items-center justify-center mt-[16px]">
        <div className="flex flex-col md:flex-row gap-[24px]">
          <div className="flex flex-col bg-white p-[24px] items-center rounded-[8px] h-fit">
            <div className="flex gap-[16px] mb-[10px]">
              <CategoryDropDown
                onSelect={(category) => {
                  setCategory(category.id);
                }}
              />
              {category ? (
                <TypeDropDown
                  onSelect={(type) => {
                    setType(type.id);
                  }}
                  category={category}
                />
              ) : null}
            </div>
            {files ? (
              <div>
                <h1>Images</h1>
                <div className="w-full flex gap-[8px] max-w-[400px] overflow-x-scroll no-scrollbar ">
                  {Array.from(files).map((e, index: number) => {
                    return (
                      <Image
                        key={index}
                        src={URL.createObjectURL(e)}
                        alt=""
                        width={100}
                        height={100}
                        objectFit="cover"
                      />
                    );
                  })}
                </div>
              </div>
            ) : (
              <div className="flex flex-col justify-center items-center h-[200px] w-[200px] bg-[#F7F7F7] mt-[16px] rounded-[8px]">
                <p>Upload image</p>
                <p>No image to display.</p>
              </div>
            )}
            <div className="grid w-full max-w-sm items-center gap-1.5 mt-[16px] mb-[1rem]">
              <Label
                htmlFor="picture"
                className="flex justify-center bg-black py-[8px]"
              >
                <Upload size={16} color="white" />
                <p className="text-white">Upload a picture</p>
                <Input
                  id="picture"
                  type="file"
                  multiple
                  placeholder="Upload Image"
                  className="hidden"
                  onChange={(e) => {
                    setFiles(e.target.files);
                    console.log(typeof e.target.files);
                  }}
                />
              </Label>
            </div>
            {/* 
            {flavors ? (
              <div className="w-full flex flex-col max-w-[500px] gap-[8px]">
                {flavors.map((e, index) => {
                  return (
                    <div
                      className="w-fit px-[10px] border-blue-400 border-[1px] bg-[#0004ff11] text-blue-400 rounded-[6px] text-[14px]"
                      key={index}
                    >
                      {e}
                    </div>
                  );
                })}
              </div>
            ) : null} */}
          </div>

          <div className="w-full flex flex-col gap-[10px] bg-white max-w-[500px] p-[24px] h-fit rounded-[8px]">
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
            />{" "}
            <Label htmlFor="flavor">Flavor</Label>
            <div className="relative flex gap-[8px]">
              <input
                type="text"
                placeholder="Flavor"
                value={flavor ?? ""}
                onChange={(e) => {
                  setFlavor(e.target.value);
                }}
                className={cn(
                  "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
                  "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
                  "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive"
                )}
              />
              <Button
                className="absolute right-0"
                onClick={() => {
                  if (flavor) {
                    const newFlavors = [...(flavors ?? []), flavor];
                    setFlavors(newFlavors);
                    setFlavor(null);
                  }
                }}
              >
                Add
              </Button>
            </div>
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
