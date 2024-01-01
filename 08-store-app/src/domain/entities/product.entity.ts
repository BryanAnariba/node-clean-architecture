export interface ProductEntityOptions {
  name: string;
  avaliable: boolean;
  price: number;
  description: string;
  user: string;
  category: string;
  deletedAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

export class ProductEntity {
  public readonly name: string;
  public readonly avaliable: boolean;
  public readonly price: number;
  public readonly description: string;
  public readonly user: string;
  public readonly category: string;
  public readonly deletedAt: Date;
  public readonly createdAt: Date;
  public readonly updatedAt: Date;

  constructor ({name, avaliable, price, description, user, category, deletedAt, createdAt, updatedAt}: ProductEntityOptions) {
    this.name=name;
    this.avaliable=avaliable;
    this.price=price;
    this.description=description;
    this.user=user;
    this.category=category;
    this.deletedAt=deletedAt;
    this.createdAt=createdAt;
    this.updatedAt=updatedAt;
  }

  public static fromObject(object: {[key: string]: any}) {
    const {name, avaliable, price, description, user, category, deletedAt, createdAt, updatedAt} = object;

    if (!name) {

    }

    if (!user) {

    }

    if (!category) {

    }

    return new ProductEntity({name, avaliable, price, description, user, category, deletedAt, createdAt, updatedAt});
  }
}