export class CreateCategoryDto {
  constructor (
    public readonly name: string,
    public readonly avaliable: boolean = false
  ) {}

  public static create(object: {[key: string]: any}): [string?, CreateCategoryDto?] {
    const {name, avaliable} = object;
    if (!name || name.length === 0) {
      return ['Category Name is required', undefined];
    } 

    if (avaliable && typeof avaliable !== 'boolean') {
      return ['Avaliable must be a boolean', undefined];
    }

    return [undefined, new CreateCategoryDto(name, avaliable)];
  }
}