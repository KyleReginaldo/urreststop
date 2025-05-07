"use client";
import Input from "@/app/components/Input";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CategoryModel } from "@/models/product";
import { supabase } from "@/utils/supabase";
import { useCallback, useEffect, useState } from "react";

const Category = () => {
  const [name, setName] = useState<string | null>(null);
  const [loaidng, setLoading] = useState<boolean>(false);
  const [categories, setCategories] = useState<CategoryModel[] | null>(null);
  const testData = [
    {
      id: 1,
      name: "data 1",
      createdAt: "1 min ago",
    },
  ];

  const createCategory = async () => {
    try {
      const category = await supabase
        .from("category")
        .insert({
          name: name,
        })
        .select()
        .single();
      console.log(category);
    } catch (e) {
      console.log(e);
    }
  };

  const fetchCategories = useCallback(async () => {
    const newCategories: CategoryModel[] = [];
    setLoading(true);
    const { data, error } = await supabase.from("category").select();
    if (error) {
      setLoading(false);
      return;
    }
    setLoading(false);
    data.map((datum) => {
      newCategories.push(new CategoryModel(datum));
    });
    setCategories(newCategories);
    fetchCategories();

    return;
  }, []);
  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  return (
    <div className="w-[100vw] p-[24px] h-[100vh] bg-[#F7F7F7]">
      <div className="flex flex-col w-full max-w-[400px] gap-[10px]">
        <Input
          placeholder="Enter category name"
          type="text"
          value={name ?? ""}
          onChange={(e) => {
            console.log(e);
            setName(e.target.value);
          }}
        />
        <Button
          className="text-white"
          onClick={() => {
            createCategory();
            console.log("testing");
          }}
        >
          Submit
        </Button>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">ID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Created at</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {(categories ?? []).map((data, index) => {
            return (
              <TableRow key={index}>
                <TableCell>{data.id}</TableCell>
                <TableCell>{data.name}</TableCell>
                <TableCell>{data.created_at.getUTCDate}</TableCell>
                <TableCell>
                  <Button className="bg-red-500">Remove</Button>
                  <Button className="bg-blue-500">Remove</Button>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};

export default Category;
