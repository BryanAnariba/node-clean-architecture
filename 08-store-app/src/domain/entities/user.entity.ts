import { CustomError } from "../errors/custom.error";

export interface UserEntityOptions {
  id: string;
  name: string;
  email: string;
  password: string;
  img?: string;
  role: string[];
  emailValidated: boolean;
}

export class UserEntity {
  public readonly id: string
  public readonly name: string;
  public readonly email: string;
  public readonly password: string;
  public readonly img: string;
  public readonly role: string[];
  public readonly emailValidated: boolean;

  constructor ({id, name, email, password, img = '', role, emailValidated}: UserEntityOptions) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.password = password;
    this.img = img;
    this.role = role;
    this.emailValidated = emailValidated;
  }

  public static fromObject(object: {[value: string]: any}): UserEntity {
    const {_id, id, name,  email,  password,  img,  role,  emailValidated} = object;

    if (!_id && !id) {
      throw CustomError.badRequest('Missing id');
    }

    if (!name || name.length === 0) {
      throw CustomError.badRequest('Missing Name');
    }

    if (!email || email.length === 0) {
      throw CustomError.badRequest('Missing Email');
    }

    if (emailValidated === undefined) {
      throw CustomError.badRequest('Missing Email Validated');
    }

    if (!password || password.length === 0) {
      throw CustomError.badRequest('Missing Password');
    }

    if (!role) {
      throw CustomError.badRequest('Missing Role');
    }

    return new UserEntity({ id: id || _id, name: name,  email: email,  password: password,  img: img,  role: role,  emailValidated: emailValidated});
  }
}