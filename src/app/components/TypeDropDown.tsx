"use client";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { TypeModel } from "@/models/product";
import { supabase } from "@/utils/supabase";
import { ChevronDown } from "lucide-react";
import { useCallback, useEffect, useState } from "react";

interface TypeProps {
  onSelect: (type: TypeModel) => void;
  category: number;
}

export function TypeDropDown(props: TypeProps) {
  const [types, setTypes] = useState<TypeModel[]>([]);
  const [selected, setSelectedType] = useState<TypeModel | null>(null);

  const getTypes = useCallback(async () => {
    const { data, error } = await supabase
      .from("type")
      .select()
      .or(`category.eq.${props.category},special.is.true`);

    const _types = data?.map((e) => {
      return new TypeModel(e);
    });
    if (error) {
      return;
    }
    setTypes(_types ?? []);
  }, [props.category]);

  useEffect(() => {
    getTypes();
  });
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="w-fit bg-[#BF9264] text-white">
        <Button variant="outline">
          {selected ? selected.name : "Select Type"} <ChevronDown />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        {types.map((e) => {
          return (
            <DropdownMenuItem
              key={e.id}
              onClick={() => {
                setSelectedType(e);
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
