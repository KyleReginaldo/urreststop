"use client";

import { ProductModel } from "@/models/product";
import Image from "next/image";

export interface Props {
  product: ProductModel;
}

const Product = ({ product }: Props) => {
  // const [currentUser, setCurrentUser] = useState<User | null>(null);

  // const getUser = async () => {
  //   const { data } = await supabase.auth.getUser();
  //   setCurrentUser(data?.user || null);
  // };

  // useEffect(() => {
  //   getUser();
  // }, []);

  // const notify = (message: string) => toast(message);

  // const addToCart = async (productId: number) => {
  //   if (!currentUser) {
  //     notify("Please log in to add to the cart.");
  //     return;
  //   }

  //   setLoading(true);

  //   try {
  //     const { data } = await supabase
  //       .from("cart")
  //       .select()
  //       .eq("product", productId)
  //       .eq("users", currentUser?.id)
  //       .single();

  //     if (data) {
  //       notify("Product is already in the cart!");
  //     } else {
  //       await supabase.from("cart").insert({
  //         product: productId,
  //         users: currentUser?.id,
  //       });
  //       notify("Added to cart!");
  //     }
  //   } catch (error) {
  //     console.error(error);
  //     notify("An error occurred. Please try again.");
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  return (
    <div className="flex flex-col items-center border-2 border-[#43261b] rounded-[8px] p-4">
      <div className="relative w-[200px] h-[200px] flex items-center justify-center">
        <Image
          alt={product.name}
          src={product.image_link}
          layout="fill"
          className="object-contain"
        />
      </div>
      <div className="flex flex-col items-start w-full">
        <p className="text-center text-[12px]">{product.name}</p>
        <p className="text-center text-[16px] font-medium">₱{product.price}</p>
      </div>
    </div>
  );
};

export default Product;
