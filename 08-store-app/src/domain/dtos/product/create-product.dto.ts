import { Validators } from "../../../config";

export class CreateProductDto {

  private constructor (
    public readonly name: string,
    public readonly avaliable: boolean,
    public readonly price: number,
    public readonly description: string,
    public readonly user: string,
    public readonly category: string,
  ) {}

  public static create(object: {[key: string]: any}): [string?, CreateProductDto?] {
    const {name, avaliable, price, description, user, category} = object;
    if (!name || name.length === 0) {
      return ['Name is required', undefined]
    }

    if (!user) {
      return ['User is required', undefined];
    }

    if (!category) {
      return ['Category is required', undefined];
    }

    if (avaliable && typeof avaliable !== 'boolean') {
      return ['Avaliable must be boolean', undefined];
    }

    if (!Validators.isMongoId(user)) {
      return ['Invalid user id', undefined];
    }

    if (!Validators.isMongoId(category)) {
      return ['Invalid category id', undefined];
    }
    
    return [undefined, new CreateProductDto(name, avaliable, price, description, user, category)];
  }
}