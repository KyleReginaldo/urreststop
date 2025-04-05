export class ProductModel {
  id: number;
  created_at: Date;
  name: string;
  price: number;
  qty: number;
  category: CategoryModel;
  constructor(map: any) {
    this.id = map["id"];
    this.created_at = map["created_at"];
    this.name = map["name"];
    this.price = map["price"];
    this.qty = map["qty"];
    this.category = map["category"];
  }
}

export class CategoryModel {
  id: number;
  created_at: Date;
  name: string;
  is_enabled: boolean;
  constructor(map: any) {
    this.id = map["id"];
    this.created_at = map["created_at"];
    this.name = map["name"];
    this.is_enabled = map["is_enabled"];
  }
}
