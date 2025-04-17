export class ProductModel {
  id: number;
  created_at: Date;
  name: string;
  price: number;
  qty: number;
  category: CategoryModel;
  image_link: string;
  type: TypeModel | null;

  constructor(map: { [key: string]: any }) {
    // Adjusted type to represent a plain object
    this.id = map["id"];
    this.created_at = map["created_at"];
    this.name = map["name"];
    this.price = map["price"];
    this.qty = map["qty"];
    this.category = new CategoryModel(map["category"]);
    this.image_link = map["image_link"];
    this.type = map["type"] ? new TypeModel(map["type"]) : null;
  }
}

export class CategoryModel {
  id: number;
  created_at: Date;
  name: string;
  is_enabled: boolean;

  constructor(map: { [key: string]: any }) {
    // Adjusted type to represent a plain object
    this.id = map["id"];
    this.created_at = map["created_at"];
    this.name = map["name"];
    this.is_enabled = map["is_enabled"];
  }
}

export class TypeModel {
  id: number;
  created_at: Date;
  name: string;
  is_enabled: boolean;

  constructor(map: { [key: string]: any }) {
    this.id = map["id"];
    this.created_at = map["created_at"];
    this.name = map["name"];
    this.is_enabled = map["is_enabled"];
  }
}
