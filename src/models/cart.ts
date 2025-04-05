import { User } from "@supabase/supabase-js";
import { ProductModel } from "./product";

export class CartModel {
  id: number;
  created_at: Date;
  product: ProductModel;
  users: User;

  constructor(map: { [key: string]: any }) {
    this.id = map.get("id");
    this.created_at = map.get("created_at");
    this.product = map.get("product");
    this.users = map.get("users");
  }
}
