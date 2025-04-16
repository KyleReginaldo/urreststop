"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/utils/supabase";
import { useCallback, useState } from "react";
import { CategoryDropDown } from "../components/CategoryDropDown";
import { TypeDropDown } from "../components/TypeDropDown";

const Admin = () => {
  const [file, setFile] = useState<FileList | null>(null);
  const [name, setName] = useState<string | null>(null);
  const [price, setPrice] = useState<number>(1);
  const [qty, setQty] = useState<number>(1);
  const [category, setCategory] = useState<number | null>(null);
  const [type, setType] = useState<number | null>(null);
  const uploadProduct = useCallback(async () => {
    let image: string | null = null;
    const bucket = "images";
    if (file) {
      const _file = file[0];
      const { data, error } = await supabase.storage
        .from(bucket)
        .upload(_file.name, _file);
      if (error) {
        console.log(error.message);
        alert(error.message);
        return;
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
      console.log(error.message);
      alert(error?.message);
    }
    return;
  }, [file, name, price, qty, type, category]);

  return (
    <div className="h-[100vh] flex items-center justify-center">
      <div className="flex flex-col gap-[10px]">
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
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="picture">Picture</Label>
          <Input
            id="picture"
            type="file"
            onChange={(e) => {
              setFile(e.target.files);
            }}
          />
        </div>
        <Label htmlFor="name">Product Name</Label>
        <Input
          type="text"
          placeholder="Product Name"
          value={name ?? ""}
          onChange={(e) => {
            setName(e.target.value);
          }}
          className="w-fit"
        />
        <Label htmlFor="price">Price</Label>
        <Input
          type="text"
          placeholder="Price"
          min={1}
          value={price ?? "1"}
          onChange={(e) => {
            setPrice(Number(e.target.value));
          }}
          className="w-fit"
        />{" "}
        <Label htmlFor="qty">Quantity</Label>
        <Input
          type="text"
          min={1}
          placeholder="Quantity"
          value={qty ?? "1"}
          onChange={(e) => {
            setQty(Number(e.target.value));
          }}
          className="w-fit"
        />
        <Button
          className="w-fit"
          onClick={() => {
            uploadProduct();
          }}
        >
          Submit
        </Button>
      </div>
    </div>
  );
};

export default Admin;
