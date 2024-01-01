import { CustomError } from "../errors/custom.error";

export interface CategoryOptions {
  id: string; 
  name: string;
  avaliable: boolean; 
  deletedAt: Date; 
  user: string;
}

export class CategoryEntity {
  public readonly id: string;
  public readonly name: string;
  public readonly avaliable: boolean;
  public readonly deletedAt?: Date;
  public readonly user: string;

  constructor({id, name, avaliable, deletedAt, user}: CategoryOptions) {
    this.id = id;
    this.name = name;
    this.avaliable = avaliable;
    this.deletedAt = deletedAt;
    this.user = user;
  }

  public static fromObject(object: {[key: string]: any}): CategoryEntity {
    const {id, _id, name, avaliable, deletedAt, user} = object;

    if (!id && !_id) {
      throw CustomError.badRequest('Id is Required')
    }

    if (!name || name.trim().length === 0) {
      throw CustomError.badRequest('Name is required');
    }

    if (!user) {
      throw CustomError.badRequest('User is required');
    }

    return new CategoryEntity( {id: id || _id, name, avaliable, deletedAt, user});
  }
}