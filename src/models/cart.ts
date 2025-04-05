import { User } from "@supabase/supabase-js";
import { ProductModel } from "./product";

export class CartModel {
  id: number;
  created_at: Date;
  product: ProductModel;
  users: User;

  constructor(map: any) {
    this.id = map["id"];
    this.created_at = map["created_at"];
    this.product = map["product"];
    this.users = map["users"];
  }
}
