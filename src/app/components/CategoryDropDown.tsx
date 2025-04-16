"use client";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CategoryModel } from "@/models/product";
import { supabase } from "@/utils/supabase";
import { useCallback, useEffect, useState } from "react";

interface CategoryProps {
  onSelect: (category: CategoryModel) => void;
}

export function CategoryDropDown(props: CategoryProps) {
  const [categories, setCategories] = useState<CategoryModel[]>([]);
  const [selected, setSelectedCategory] = useState<CategoryModel | null>(null);
  const getCategories = useCallback(async () => {
    const { data, error } = await supabase.from("category").select();
    const _categories = data?.map((e) => {
      return new CategoryModel(e);
    });
    if (error) {
      return;
    }
    setCategories(_categories ?? []);
  }, []);

  useEffect(() => {
    getCategories();
  });
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">
          {selected ? selected.name : "Select Category"}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        {categories.map((e) => {
          return (
            <DropdownMenuItem
              key={e.id}
              onClick={() => {
                setSelectedCategory(e);
                props.onSelect(e);
              }}
            >
              {e.name}
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
